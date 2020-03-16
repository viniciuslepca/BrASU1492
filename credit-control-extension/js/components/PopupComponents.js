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
                    <PredictedBillsSwitch/>
                    <ContentBox/>
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

class PredictedBillsSwitch extends React.Component {
    render() {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>Include predicted expenses</p>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="switch-slider round"/>
                </label>
            </div>
        );
    }
}

class ContentBox extends React.Component {
    render() {
        return (
            <div className="center content-box">
                <InstallmentsPlot/>
            </div>
        )
    }
}

class InstallmentsPlot extends React.Component {
    constructor(props) {
        super(props);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const dataVals = [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0];
        const fillGreen = "rgba(147, 196, 45, 0.5)";
        const borderGreen = "rgba(147, 196, 45, 1)";
        const fillRed = "rgba(229, 97, 92, 0.5)";
        const borderRed = "rgba(229, 97, 92, 1)";
        const colors = {fillGreen: fillGreen, borderGreen: borderGreen, fillRed: fillRed, borderRed: borderRed};
        const recommendedLimit = 800;
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
        this.state = {months: months, dataVals: dataVals, colors: colors,
            recommendedLimit: recommendedLimit, backGroundColors: backgroundColors, borderColors: borderColors};
    }

    componentDidMount() {
        let ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
                datasets: [{
                    label: 'Future bills',
                    data: [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0],
                    backgroundColor: this.state.backGroundColors,
                    borderColor: this.state.borderColors,
                    borderWidth: 1
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
        console.log(value);
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