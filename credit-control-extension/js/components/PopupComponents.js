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
                    <PopupHeader/>
                    <div id="popup-body">
                        <PopupStats price={this.state.bg.priceVal} income={this.state.bg.income}/>
                        <ItemPrice price={this.state.bg.priceStr}/>
                        <ContentComponents price={this.state.bg.priceVal} income={this.state.bg.income} bills={this.state.bg.bills}/>
                    </div>
                </div>
            );
        } else {
            const fact = this.state.bg.educationalStats[Math.floor(Math.random() * this.state.bg.educationalStats.length)];
            return (
                <div>
                    <PopupHeader/>
                    <p>{fact}</p>
                </div>
            );
        }
    }
}

class ContentComponents extends React.Component {
    constructor(props) {
        super(props);
        // TODO - make this be dependent on the actual expenses
        const predictedExpenses = parseFloat((0.5 * this.props.income).toFixed(2));
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
                            price={this.props.price} installments={this.state.installments} income={this.props.income} bills={this.props.bills}/>
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
                <p>Incluir estimativa de despesas (R${this.props.predictedExpenses}/mês)</p>
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
        const dataVals = this.props.bills;
        // Set basic colors for the plot
        const fillGreen = "rgba(147, 196, 45, 0.5)";
        const borderGreen = "rgba(147, 196, 45, 1)";
        const fillRed = "rgba(229, 97, 92, 0.5)";
        const borderRed = "rgba(229, 97, 92, 1)";
        const fillBlack = "rgba(61, 61, 61, 0.5)";
        const borderBlack = "rgba(61, 61, 61, 1)";
        const opaquePurple = "rgba(158, 27, 209, 1)";
        const transparentPurple = "rgba(158, 27, 209, 0.2)";
        const colors = {fillGreen: fillGreen, borderGreen: borderGreen, fillRed: fillRed, borderRed: borderRed,
            fillBlack: fillBlack, borderBlack: borderBlack, opaquePurple: opaquePurple, transparentPurple: transparentPurple};
        // Define recommended maximum monthly expense (30% of income)
        const recommendedLimit = parseFloat((0.3 * this.props.income).toFixed(2));
        let recLimLine = [];
        for (let i = 0; i < dataVals.length; i++) {
            recLimLine.push(recommendedLimit);
        }
        // Define the credit limit (70% of income)
        // TODO - pull actual value from database
        const creditLimit = parseFloat((1 * this.props.income).toFixed(2));
        let creditLimitLine = [];
        for (let i = 0; i < dataVals.length; i++) {
            creditLimitLine.push(creditLimit);
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
            if (displayData[i] >= creditLimit) {
                backgroundColors.push(colors.fillBlack);
                borderColors.push(colors.borderBlack);
            } else if (displayData[i] >= recommendedLimit) {
                backgroundColors.push(colors.fillRed);
                borderColors.push(colors.borderRed);
            } else {
                backgroundColors.push(colors.fillGreen);
                borderColors.push(colors.borderGreen);
            }
        }

        // Record everything in the state
        this.state = {months: months, dataVals: dataVals, displayData: displayData, colors: colors,
            backgroundColors: backgroundColors, borderColors: borderColors, recommendedLimit: recommendedLimit,
            recLimLine: recLimLine, creditLimit: creditLimit, creditLimitLine: creditLimitLine, chart: null};
    }

    componentDidMount() {
        // Render the plot
        let ctx = document.getElementById('myChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ', 'JAN', 'FEV'],
                datasets: [{
                    label: 'Próximas faturas',
                    data: this.state.displayData,
                    backgroundColor: this.state.backgroundColors,
                    borderColor: this.state.borderColors,
                    borderWidth: 1,
                }, {
                    label: 'Fatura máxima recomendada',
                    data: this.state.recLimLine,
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: this.state.colors.fillBlack,
                    borderDash: [15, 5],
                    borderWidth: 1.5,
                    pointRadius: 0,
                    type: 'line'
                }, {
                    label: 'Limite do cartão',
                    data: this.state.creditLimitLine,
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: this.state.colors.fillRed,
                    borderDash: [15, 5],
                    borderWidth: 1.5,
                    pointRadius: 0,
                    type: 'line'
                }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: this.state.colors.opaquePurple
                        },
                        gridLines: {
                            drawOnChartArea: false,
                            color: this.state.colors.transparentPurple
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: this.state.colors.opaquePurple
                        },
                        gridLines: {
                            drawOnChartArea: false,
                            color: this.state.colors.transparentPurple
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontColor: this.state.colors.opaquePurple
                    }
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

    setColors(newData, recommendedLimit) {
        let backgroundColors = [];
        let borderColors = [];
        for (let i = 0; i < newData.length; i++) {
            if (newData[i] >= this.state.creditLimit) {
                backgroundColors.push(this.state.colors.fillBlack);
                borderColors.push(this.state.colors.borderBlack);
            } else if (newData[i] >= recommendedLimit) {
                backgroundColors.push(this.state.colors.fillRed);
                borderColors.push(this.state.colors.borderRed);
            } else {
                backgroundColors.push(this.state.colors.fillGreen);
                borderColors.push(this.state.colors.borderGreen);
            }
        }
        return [backgroundColors, borderColors];
    }

    updateIncludePredicted() {
        // Update future bills and recommended limit
        let newData = this.state.chart.data.datasets[0].data;
        let newRecLim = this.state.chart.data.datasets[1].data;
        let recLim = this.state.recommendedLimit;
        if (this.props.includePredicted) {
            for (let i = 0; i < newData.length; i++) {
                newData[i] += this.props.predictedExpenses;
                newRecLim[i] += this.props.predictedExpenses;
            }
            recLim += this.props.predictedExpenses;
        } else {
            for (let i = 0; i < newData.length; i++) {
                newData[i] -= this.props.predictedExpenses;
                newRecLim[i] -= this.props.predictedExpenses;
            }
        }
        // Update colors
        const colorResults = this.setColors(newData, recLim);
        const backgroundColors = colorResults[0];
        const borderColors = colorResults[1];

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
        const colorResults = this.setColors(newData, this.state.chart.data.datasets[1].data[0]);
        const backgroundColors = colorResults[0];
        const borderColors = colorResults[1];

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
                <p style={{marginBottom: 0, textAlign: "center"}}>Quero fazer essa compra em {this.state.installments}X</p>
                <input type="range" min="1" max="12" defaultValue="1" className="slider" id="installments-slider" onChange={(event)=>this.handleChange(event)}/>
            </div>
        );
    }
}

class ItemPrice extends React.Component {
    render() {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>Valor da compra:</p><p>{this.props.price}</p>
            </div>
        );
    }
}

class PopupStats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const percentage = ((this.props.price / this.props.income) * 100).toFixed(1);
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Você realmente precisa disso?</h1>
                <p>Esse item representa {percentage}% da sua renda mensal</p>
            </div>
        );
    }
}

function PopupHeader() {
    return (
        <div id="header">
            <img src="../../images/nubank_logo_offwhite.png" height="40" alt="Nubank Logo" className="center"/>
        </div>
    );
}

ReactDOM.render(<PopupComponents/>, document.querySelector("#popup"));