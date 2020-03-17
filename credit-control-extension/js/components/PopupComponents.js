class PopupComponents extends React.Component {
    constructor(props) {
        super(props);
        const bg = chrome.extension.getBackgroundPage();
        this.state = {bg: bg};
    }

    render() {
        // TODO FIX THIS LATER - SHOULD BE if(this.state.bg.price !== null)
        if (this.state.bg.price !== null || true) {
            return(
                <div>
                    <PopupTitle/>
                    <ItemPrice price={this.state.bg.price}/>
                    <SwitchAndContentBox/>
                    <InstallmentsSlider/>
                </div>
            );
        } else {
            return (
                <p>Please run this extension on Amazon's checkout page</p>
            );
        }
    }
}

class SwitchAndContentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {includePredicted: false};
    }

    setIncludePredicted(checked) {
        this.setState({includePredicted: checked});
    }

    render() {
        return (
            <div>
                <PredictedBillsSwitch setIncludePredicted={this.setIncludePredicted.bind(this)}/>
                <ContentBox includePredicted={this.state.includePredicted}/>
            </div>
        )
    }
}

class PredictedBillsSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        const checked = document.getElementById("predicted-bills").checked;
        this.props.setIncludePredicted(checked);
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>Include predicted expenses</p>
                <label className="switch">
                    <input type="checkbox" id="predicted-bills" onChange={this.handleChange}/>
                    <span className="switch-slider round"/>
                </label>
            </div>
        );
    }
}

class ContentBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center content-box">
                <InstallmentsPlot includePredicted={this.props.includePredicted}/>
            </div>
        )
    }
}

class InstallmentsPlot extends React.Component {
    constructor(props) {
        super(props);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const dataVals = [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0];
        const predictedExpenses = 200;
        const fillGreen = "rgba(147, 196, 45, 0.5)";
        const borderGreen = "rgba(147, 196, 45, 1)";
        const fillRed = "rgba(229, 97, 92, 0.5)";
        const borderRed = "rgba(229, 97, 92, 1)";
        const colors = {fillGreen: fillGreen, borderGreen: borderGreen, fillRed: fillRed, borderRed: borderRed};
        const recommendedLimit = 800;
        let recLimLine = [];
        for (let i = 0; i < dataVals.length; i++) {
            recLimLine.push(recommendedLimit);
        }
        let backgroundColors = [];
        let borderColors = [];
        for (let i = 0; i < dataVals.length; i++) {
            if (dataVals[i] >= recommendedLimit) {
                backgroundColors.push(colors.fillRed);
                borderColors.push(colors.borderRed);
            } else {
                backgroundColors.push(colors.fillGreen);
                borderColors.push(colors.borderGreen);
            }
        }
        this.state = {months: months, dataVals: dataVals, colors: colors, recommendedLimit: recommendedLimit, recLimLine: recLimLine,
            backGroundColors: backgroundColors, borderColors: borderColors, predictedExpenses: predictedExpenses, chart: null};
    }


    componentDidMount() {
        let ctx = document.getElementById('myChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
                datasets: [{
                    label: 'Future bills (red if higher than recommended)',
                    data: this.state.dataVals,
                    backgroundColor: this.state.backGroundColors,
                    borderColor: this.state.borderColors,
                    borderWidth: 1,
                }, {
                    label: 'Maximum recommended bill',
                    data: this.state.recLimLine,
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: "rgba(61,61,61,0.5)",
                    pointRadius: 1,
                    type: 'line'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
        this.setState({chart: chart});
    }

    componentDidUpdate(prevProps) {
        if (this.props.includePredicted !== prevProps.includePredicted) {
            let newData = this.state.chart.data.datasets[0].data;
            if (this.props.includePredicted) {
                for (let i = 0; i < newData.length; i++) {
                    newData[i] += this.state.predictedExpenses;
                }
            } else {
                for (let i = 0; i < newData.length; i++) {
                    newData[i] -= this.state.predictedExpenses;
                }
            }
            let backgroundColors = [];
            let borderColors = [];
            for (let i = 0; i < newData.length; i++) {
                if (newData[i] >= this.state.recommendedLimit) {
                    backgroundColors.push(this.state.colors.fillRed);
                    borderColors.push(this.state.colors.borderRed);
                } else {
                    backgroundColors.push(this.state.colors.fillGreen);
                    borderColors.push(this.state.colors.borderGreen);
                }
            }
            this.state.chart.data.datasets[0].data = newData;
            this.state.chart.data.datasets[0].backgroundColor = backgroundColors;
            this.state.chart.data.datasets[0].borderColor = borderColors;
            this.state.chart.update();
        }
    }

    render() {
        return (
            <canvas id="myChart" width="400" height="400"/>
        );
    }
}

class InstallmentsSlider extends React.Component {
    constructor() {
        super();
        this.state = {installments: 1}
    }

    handleChange() {
        const value = document.getElementById("installments-slider").value;
        this.setState({installments: value});
    }

    render() {
        return(
            <div className="slide-container">
                <p style={{marginBottom: 0, textAlign: "center"}}>I want to buy this in {this.state.installments}X</p>
                <input type="range" min="1" max="12" defaultValue="1" className="slider" id="installments-slider" onChange={(event)=>this.handleChange(event)}/>
            </div>
        );
    }
}

class ItemPrice extends React.Component {
    render() {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>Item price:</p><p>{this.props.price}</p>
            </div>
        );
    }

}

function PopupTitle() {
    return <h1 style={{textAlign: "center"}}>Nubank Credit Control Extension</h1>
}

ReactDOM.render(<PopupComponents/>, document.querySelector("#popup-body"));