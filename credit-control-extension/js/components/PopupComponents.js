class PopupComponents extends React.Component {
    constructor(props) {
        super(props);
        const bg = chrome.extension.getBackgroundPage();
        this.state = {bg: bg};
    }

    render() {
        if (this.state.bg.priceStr !== null) {
            return(
                <div>
                    <PopupTitle/>
                    <ItemPrice price={this.state.bg.priceStr}/>
                    <ContentComponents price={this.state.bg.priceVal}/>
                </div>
            );
        } else {
            return (
                <p>Please run this extension on Amazon's checkout page</p>
            );
        }
    }
}

class ContentComponents extends React.Component {
    constructor(props) {
        super(props);
        const predictedExpenses = 200;
        this.state = {includePredicted: false, predictedExpenses: predictedExpenses, installments: 1};
    }

    setIncludePredicted(checked) {
        this.setState({includePredicted: checked});
    }

    setInstallments(val) {
        this.setState({installments: val});
    }

    render() {
        return (
            <div>
                <PredictedBillsSwitch setIncludePredicted={this.setIncludePredicted.bind(this)} predictedExpenses={this.state.predictedExpenses}/>
                <InstallmentsPlot includePredicted={this.state.includePredicted} predictedExpenses={this.state.predictedExpenses}
                            price={this.props.price} installments={this.state.installments}/>
                <InstallmentsSlider setInstallments={this.setInstallments.bind(this)}/>
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
                <p>Include predicted expenses (${this.props.predictedExpenses}/month)</p>
                <label className="switch">
                    <input type="checkbox" id="predicted-bills" onChange={this.handleChange}/>
                    <span className="switch-slider round"/>
                </label>
            </div>
        );
    }
}


class InstallmentsPlot extends React.Component {
    constructor(props) {
        super(props);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const dataVals = [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0];
        // Set basic colors for the plot
        const fillGreen = "rgba(147, 196, 45, 0.5)";
        const borderGreen = "rgba(147, 196, 45, 1)";
        const fillRed = "rgba(229, 97, 92, 0.5)";
        const borderRed = "rgba(229, 97, 92, 1)";
        const colors = {fillGreen: fillGreen, borderGreen: borderGreen, fillRed: fillRed, borderRed: borderRed};
        // Define recommended maximum monthly expense
        const recommendedLimit = 800;
        let recLimLine = [];
        for (let i = 0; i < dataVals.length; i++) {
            recLimLine.push(recommendedLimit);
        }
        // Include price of the item in 1 installment for first render
        let displayData = [];
        for (let i = 0; i < dataVals.length; i++) {
            if (i === 0) {
                // Assuming the initial state is a single installment
                displayData.push(dataVals[i] + props.price);
            } else {
                displayData.push(dataVals[i]);
            }
        }
        // Set bar colors based on whether they're lower or higher than recommended
        let backgroundColors = [];
        let borderColors = [];
        for (let i = 0; i < displayData.length; i++) {
            if (displayData[i] >= recommendedLimit) {
                backgroundColors.push(colors.fillRed);
                borderColors.push(colors.borderRed);
            } else {
                backgroundColors.push(colors.fillGreen);
                borderColors.push(colors.borderGreen);
            }
        }

        // Record everything in the state
        this.state = {months: months, dataVals: dataVals, displayData: displayData, colors: colors,
            backgroundColors: backgroundColors, borderColors: borderColors,
            recommendedLimit: recommendedLimit, recLimLine: recLimLine, chart: null};
    }


    componentDidMount() {
        // Render the plot
        let ctx = document.getElementById('myChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
                datasets: [{
                    label: 'Future bills (red if higher than recommended)',
                    data: this.state.displayData,
                    backgroundColor: this.state.backgroundColors,
                    borderColor: this.state.borderColors,
                    borderWidth: 1,
                }, {
                    label: 'Maximum recommended bill',
                    data: this.state.recLimLine,
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: "rgba(61,61,61,0.5)",
                    borderDash: [15, 5],
                    borderWidth: 1.5,
                    pointRadius: 0,
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
        // Include or exclude the predicted expenses
        if (this.props.includePredicted !== prevProps.includePredicted) {
            this.updateIncludePredicted();
        }
        // Change the installment distribution
        if (this.props.installments !== prevProps.installments) {
            this.updateInstallments();
        }
    }

    updateIncludePredicted() {
        let newData = this.state.chart.data.datasets[0].data;
        if (this.props.includePredicted) {
            for (let i = 0; i < newData.length; i++) {
                newData[i] += this.props.predictedExpenses;
            }
        } else {
            for (let i = 0; i < newData.length; i++) {
                newData[i] -= this.props.predictedExpenses;
            }
        }
        // Update colors
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

    updateInstallments() {
        // Copy the original data values
        let newData = [];
        for (let i = 0; i < this.state.dataVals.length; i++) {
            newData.push(this.state.dataVals[i]);
        }
        // Include predicted expenses if necessary
        if (this.props.includePredicted) {
            for (let i = 0; i < newData.length; i++) {
                newData[i] += this.props.predictedExpenses;
            }
        }
        // Add monthly installments
        let monthlyInstallment = this.props.price / this.props.installments;
        monthlyInstallment = parseFloat(monthlyInstallment.toFixed(2)); // 2 decimal places
        for (let i = 0; i < this.props.installments; i++) {
            newData[i] += monthlyInstallment;
        }
        // Update colors
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


    render() {
        return (
            <div className="center content-box">
                <canvas id="myChart" width="400" height="400"/>
            </div>
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
        this.props.setInstallments(value);
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