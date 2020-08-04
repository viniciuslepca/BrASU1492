class PopupComponents extends React.Component {
    constructor(props) {
        super(props);
        const bg = chrome.extension.getBackgroundPage();
        this.state = {bg: bg};
    }

    render() {
        if (this.props.priceStr !== null) {
            return (
                <div>
                    <PopupHeader/>
                    <div id="popup-body">
                        <PopupStats price={this.props.priceVal} income={this.state.bg.income}/>
                        <ItemPrice price={this.props.priceStr}/>
                        <ContentComponents price={this.props.priceVal} income={this.state.bg.income}
                                           bills={this.state.bg.bills} expenseCeiling={this.state.bg.expenseCeiling}
                                           predictedExpenses={parseFloat(this.state.bg.predictedExpenses.toFixed(2))}/>
                        <LearnMore educationalFacts={this.state.bg.educationalFacts}/>
                    </div>
                </div>
            );
        } else {
            const fact = this.state.bg.educationalFacts[Math.floor(Math.random() * this.state.bg.educationalFacts.length)];
            return (
                <div>
                    <PopupHeader/>
                    <h1 style={{textAlign: "center"}}>Dicas Nubank</h1>
                    <p>{fact}</p>
                </div>
            );
        }
    }
}

class ContentComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {includePredicted: false, installments: 1};
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
                <PredictedBillsSwitch setIncludePredicted={this.setIncludePredicted.bind(this)}
                                      predictedExpenses={this.props.predictedExpenses}/>
                <InstallmentsSlider setInstallments={this.setInstallments.bind(this)} price={this.props.price}/>
                <InstallmentsPlot includePredicted={this.state.includePredicted}
                                  predictedExpenses={this.props.predictedExpenses}
                                  price={this.props.price} installments={this.state.installments}
                                  expenseCeiling={this.props.expenseCeiling}
                                  income={this.props.income} bills={this.props.bills}/>
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
        // Set month information based on current month
        const monthData = this.defineMonthList();
        // Set basic colors to be used
        const colors = this.defineBasicColors();
        // Define recommended maximum monthly expense (30% of income)
        const dataVals = this.props.bills;
        const recommendedLimit = parseFloat((0.3 * this.props.income).toFixed(2));
        let recLimLine = [];
        for (let i = 0; i < dataVals.length; i++) {
            recLimLine.push((recommendedLimit / (i + 1.0)).toFixed(2));
        }

        // Define the expense ceiling line
        const expenseCeilingLine = Array(dataVals.length).fill(props.expenseCeiling);

        // Include price of the item in 1 installment for first render
        let displayData = [];
        for (let i = 0; i < dataVals.length; i++) {
            if (i === 0) {
                // Assuming the initial state is a single installment
                displayData.push((dataVals[i] + props.price).toFixed(2));
            } else {
                displayData.push(dataVals[i].toFixed(2));
            }
        }
        // Set bar colors based on whether they're lower or higher than recommended
        const [backgroundColors, borderColors] = this.setColors(displayData, recLimLine, colors);

        // Record everything in the state
        this.state = {
            months: monthData,
            dataVals: dataVals,
            displayData: displayData,
            colors: colors,
            backgroundColors: backgroundColors,
            borderColors: borderColors,
            recLimLine: recLimLine,
            maximumInstallmentsLabel: 'Fatura máxima recomendada',
            expenseCeilingLabel: 'Limite de gastos mensais',
            expenseCeilingLine: expenseCeilingLine,
            chart: null
        };
    }

    defineMonthList() {
        const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        let monthData = [];
        const now = new Date();
        for (let i = now.getMonth(); i < 12; i++) {
            monthData.push(months[i]);
        }
        for (let i = 0; i < now.getMonth(); i++) {
            monthData.push(months[i]);
        }
        return monthData;
    }

    defineBasicColors() {
        // Set basic colors for the plot
        const fillGreen = "rgba(147, 196, 45, 0.5)";
        const borderGreen = "rgba(147, 196, 45, 1)";
        const fillRed = "rgba(229, 97, 92, 0.5)";
        const borderRed = "rgba(229, 97, 92, 1)";
        const fillBlack = "rgba(61, 61, 61, 0.5)";
        const borderBlack = "rgba(61, 61, 61, 1)";
        const opaquePurple = "rgba(158, 27, 209, 1)";
        const transparentPurple = "rgba(158, 27, 209, 0.2)";
        return {
            fillGreen: fillGreen,
            borderGreen: borderGreen,
            fillRed: fillRed,
            borderRed: borderRed,
            fillBlack: fillBlack,
            borderBlack: borderBlack,
            opaquePurple: opaquePurple,
            transparentPurple: transparentPurple
        };
    }

    componentDidMount() {
        // Render the plot
        let ctx = document.getElementById('myChart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.state.months,
                datasets: [{
                    label: 'Próximas faturas',
                    data: this.state.displayData,
                    backgroundColor: this.state.backgroundColors,
                    borderColor: this.state.borderColors,
                    borderWidth: 1,
                }, {
                    label: this.state.maximumInstallmentsLabel,
                    data: this.state.recLimLine,
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: this.state.colors.fillBlack,
                    borderDash: [15, 5],
                    borderWidth: 1.5,
                    pointRadius: 2,
                    pointHitRadius: 3,
                    type: 'line'
                }]
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

    setColors(newData, recommendedLimits, colors = this.state.colors) {
        let backgroundColors = [];
        let borderColors = [];
        for (let i = 0; i < newData.length; i++) {
            if (newData[i] >= parseFloat(recommendedLimits[i])) {
                backgroundColors.push(colors.fillRed);
                borderColors.push(colors.borderRed);
            } else {
                backgroundColors.push(colors.fillGreen);
                borderColors.push(colors.borderGreen);
            }
        }
        return [backgroundColors, borderColors];
    }

    updateIncludePredicted() {
        // Update future bills and recommended limit
        let newData = this.state.chart.data.datasets[0].data;
        let limitLine = null;
        let label = null;
        if (this.props.includePredicted) {
            limitLine = this.state.expenseCeilingLine;
            label = this.state.expenseCeilingLabel;
            for (let i = 0; i < newData.length; i++) {
                newData[i] = (parseFloat(newData[i]) + this.props.predictedExpenses).toFixed(2);
            }
        } else {
            limitLine = this.state.recLimLine;
            label = this.state.maximumInstallmentsLabel;
            for (let i = 0; i < newData.length; i++) {
                newData[i] = (parseFloat(newData[i]) - this.props.predictedExpenses).toFixed(2);
            }
        }
        // Update colors
        const [backgroundColors, borderColors] = this.setColors(newData, limitLine);

        this.state.chart.data.datasets[0].data = newData;
        this.state.chart.data.datasets[0].backgroundColor = backgroundColors;
        this.state.chart.data.datasets[0].borderColor = borderColors;
        this.state.chart.data.datasets[1].data = limitLine;
        this.state.chart.data.datasets[1].label = label;
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
            newData[i] = newData[i].toFixed(2);
        }
        // Update colors
        const colorResults = this.setColors(newData, this.state.chart.data.datasets[1].data);
        const backgroundColors = colorResults[0];
        const borderColors = colorResults[1];

        this.state.chart.data.datasets[0].data = newData;
        this.state.chart.data.datasets[0].backgroundColor = backgroundColors;
        this.state.chart.data.datasets[0].borderColor = borderColors;
        this.state.chart.update();
    }


    render() {
        return (
            <div className="center content-box plot-area">
                <canvas id="myChart" width="400" height="400"/>
            </div>
        );
    }
}

class InstallmentsSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {installments: 1, monthlyInstallment: props.price.toFixed(2).replace('.', ',')};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        const installments = document.getElementById("installments-slider").value;
        let monthlyInstallment = this.props.price / installments;
        monthlyInstallment = monthlyInstallment.toFixed(2).replace('.', ',');
        this.setState({installments: installments, monthlyInstallment: monthlyInstallment});
        this.props.setInstallments(installments);
    }

    render() {
        return (
            <div className="slide-container">
                <p style={{marginBottom: 0, textAlign: "center"}}>Quero fazer essa compra em {this.state.installments}X
                    de R${this.state.monthlyInstallment}</p>
                <input type="range" min="1" max="12" defaultValue="1" className="slider" id="installments-slider"
                       onChange={(event) => this.handleChange(event)}/>
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
        <div id="header" style={{height: "40px"}}>
            {/*<div style={{width: "40px"}}/>*/}
            <img src="../../images/logo-white.png" style={{height: "100%"}} alt="Nubank Logo"/>
            {/*<button onClick={() => chrome.runtime.openOptionsPage()}><img src="../../images/settings.png"*/}
            {/*                                                              title="Configurações" alt="Configurações"/>*/}
            {/*</button>*/}
        </div>
    );
}

class LearnMore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const fact = this.props.educationalFacts[Math.floor(Math.random() * this.props.educationalFacts.length)];
        return (
            <div className="content-box" style={{border: "5px", marginTop: "12px", padding: "3px"}}>
                <h1 style={{textAlign: "center", color: "#9e1bd1"}}>Dicas Nubank</h1>
                <p style={{color: "#9e1bd1"}}>{fact}</p>
            </div>
        )
    }
}

chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {type: "getPrice"}, renderPopup);
});

function renderPopup(response) {
    let priceStr = null;
    let priceVal = null;
    if (response) {
        priceStr = response.priceStr;
        priceVal = response.priceVal
    }
    ReactDOM.render(<PopupComponents priceStr={priceStr} priceVal={priceVal}/>, document.querySelector("#popup"));
}