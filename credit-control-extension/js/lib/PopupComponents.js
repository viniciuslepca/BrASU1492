var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopupComponents = function (_React$Component) {
    _inherits(PopupComponents, _React$Component);

    function PopupComponents(props) {
        _classCallCheck(this, PopupComponents);

        var _this = _possibleConstructorReturn(this, (PopupComponents.__proto__ || Object.getPrototypeOf(PopupComponents)).call(this, props));

        var bg = chrome.extension.getBackgroundPage();
        _this.state = { bg: bg };
        return _this;
    }

    _createClass(PopupComponents, [{
        key: "render",
        value: function render() {
            if (this.props.priceStr !== null) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(PopupHeader, null),
                    React.createElement(
                        "div",
                        { id: "popup-body" },
                        React.createElement(PopupStats, { price: this.props.priceVal, income: this.state.bg.income }),
                        React.createElement(ItemPrice, { price: this.props.priceStr }),
                        React.createElement(ContentComponents, { price: this.props.priceVal, income: this.state.bg.income,
                            balance: this.state.bg.balance,
                            bills: this.state.bg.bills, expenseCeiling: this.state.bg.expenseCeiling,
                            predictedExpenses: parseFloat(this.state.bg.predictedExpenses.toFixed(2)) }),
                        React.createElement(LearnMore, { educationalFacts: this.state.bg.educationalFacts })
                    )
                );
            } else {
                var fact = this.state.bg.educationalFacts[Math.floor(Math.random() * this.state.bg.educationalFacts.length)];
                return React.createElement(
                    "div",
                    null,
                    React.createElement(PopupHeader, null),
                    React.createElement(
                        "h1",
                        { style: { textAlign: "center" } },
                        "Dicas Nubank"
                    ),
                    React.createElement(
                        "p",
                        null,
                        fact
                    )
                );
            }
        }
    }]);

    return PopupComponents;
}(React.Component);

var ContentComponents = function (_React$Component2) {
    _inherits(ContentComponents, _React$Component2);

    function ContentComponents(props) {
        _classCallCheck(this, ContentComponents);

        var _this2 = _possibleConstructorReturn(this, (ContentComponents.__proto__ || Object.getPrototypeOf(ContentComponents)).call(this, props));

        _this2.state = { includePredicted: false, installments: 1 };
        return _this2;
    }

    _createClass(ContentComponents, [{
        key: "setIncludePredicted",
        value: function setIncludePredicted(checked) {
            this.setState({ includePredicted: checked });
        }
    }, {
        key: "setInstallments",
        value: function setInstallments(val) {
            this.setState({ installments: val });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(PredictedBillsSwitch, { setIncludePredicted: this.setIncludePredicted.bind(this),
                    predictedExpenses: this.props.predictedExpenses }),
                React.createElement(RecommendedInstallments, { price: this.props.price, balance: this.props.balance,
                    income: this.props.income, bills: this.props.bills,
                    expenseCeiling: this.props.expenseCeiling,
                    predictedExpenses: this.props.predictedExpenses }),
                React.createElement(InstallmentsSlider, { setInstallments: this.setInstallments.bind(this), price: this.props.price }),
                React.createElement(InstallmentsPlot, { includePredicted: this.state.includePredicted,
                    predictedExpenses: this.props.predictedExpenses,
                    price: this.props.price, installments: this.state.installments,
                    expenseCeiling: this.props.expenseCeiling, balance: this.props.balance,
                    income: this.props.income, bills: this.props.bills })
            );
        }
    }]);

    return ContentComponents;
}(React.Component);

var RecommendedInstallments = function (_React$Component3) {
    _inherits(RecommendedInstallments, _React$Component3);

    function RecommendedInstallments(props) {
        _classCallCheck(this, RecommendedInstallments);

        var _this3 = _possibleConstructorReturn(this, (RecommendedInstallments.__proto__ || Object.getPrototypeOf(RecommendedInstallments)).call(this, props));

        _this3.state = {
            recommendedInstallments: null
        };
        return _this3;
    }

    _createClass(RecommendedInstallments, [{
        key: "getRecommendedInstallmentsFromServer",
        value: function getRecommendedInstallmentsFromServer() {
            var _this4 = this;

            var apiUrl = "http://127.0.0.1:5000/rec_installments";
            fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({
                    price: this.props.price,
                    balance: this.props.balance,
                    income: this.props.income,
                    bills: this.props.bills,
                    expenseCeiling: this.props.expenseCeiling,
                    predictedExpenses: this.props.predictedExpenses
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                return _this4.setState({ recommendedInstallments: data.rec_installments });
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getRecommendedInstallmentsFromServer();
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.recommendedInstallments === null) return null;

            if (this.state.recommendedInstallments === 0) {
                return React.createElement(
                    "h3",
                    null,
                    "Talvez agora n\xE3o seja o melhor momento para essa compra!"
                );
            }

            return React.createElement(
                "h3",
                null,
                "Nosso algoritmo recomenda parcelar essa compra em ",
                this.state.recommendedInstallments,
                " vez",
                this.state.recommendedInstallments > 1 ? "es" : null,
                "!"
            );
        }
    }]);

    return RecommendedInstallments;
}(React.Component);

var PredictedBillsSwitch = function (_React$Component4) {
    _inherits(PredictedBillsSwitch, _React$Component4);

    function PredictedBillsSwitch(props) {
        _classCallCheck(this, PredictedBillsSwitch);

        var _this5 = _possibleConstructorReturn(this, (PredictedBillsSwitch.__proto__ || Object.getPrototypeOf(PredictedBillsSwitch)).call(this, props));

        _this5.handleChange = _this5.handleChange.bind(_this5);
        return _this5;
    }

    _createClass(PredictedBillsSwitch, [{
        key: "handleChange",
        value: function handleChange() {
            var checked = document.getElementById("predicted-bills").checked;
            this.props.setIncludePredicted(checked);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: { display: "flex", justifyContent: "space-between" } },
                React.createElement(
                    "p",
                    null,
                    "Incluir estimativa de despesas (R$",
                    this.props.predictedExpenses,
                    "/m\xEAs)"
                ),
                React.createElement(
                    "label",
                    { className: "switch" },
                    React.createElement("input", { type: "checkbox", id: "predicted-bills", onChange: this.handleChange }),
                    React.createElement("span", { className: "switch-slider round" })
                )
            );
        }
    }]);

    return PredictedBillsSwitch;
}(React.Component);

var InstallmentsPlot = function (_React$Component5) {
    _inherits(InstallmentsPlot, _React$Component5);

    function InstallmentsPlot(props) {
        _classCallCheck(this, InstallmentsPlot);

        // Set month information based on current month
        var _this6 = _possibleConstructorReturn(this, (InstallmentsPlot.__proto__ || Object.getPrototypeOf(InstallmentsPlot)).call(this, props));

        var monthData = _this6.defineMonthList();
        // Set basic colors to be used
        var colors = _this6.defineBasicColors();
        // Define recommended maximum monthly expense (30% of income)
        var dataVals = props.bills;
        var recommendedLimit = parseFloat((0.3 * props.income).toFixed(2));
        var recLimLine = [];
        // const recommendedLimitMultiplier = 1.0 / Math.exp(1); // Has to be <= 2/3
        // Recommended multiplier is defined based on the relationship between available balance and monthly income
        var balanceByIncome = props.balance * 1.0 / props.income;
        var maxMultiplier = 2.0 / 3;
        var recommendedLimitMultiplier = balanceByIncome >= maxMultiplier ? maxMultiplier : balanceByIncome;
        console.log("multiplier: ", recommendedLimitMultiplier);
        var offsetFactor = recommendedLimitMultiplier * recommendedLimit;
        for (var i = 0; i < dataVals.length; i++) {
            var dataPoint = (recommendedLimit + offsetFactor * Math.log(i + 1)) / (i + 1.0);
            recLimLine.push(dataPoint.toFixed(2));
        }

        // Define the expense ceiling line
        var expenseCeilingLine = Array(dataVals.length).fill(props.expenseCeiling);

        // Include price of the item in 1 installment for first render
        var displayData = [];
        for (var _i = 0; _i < dataVals.length; _i++) {
            if (_i === 0) {
                // Assuming the initial state is a single installment
                displayData.push((dataVals[_i] + props.price).toFixed(2));
            } else {
                displayData.push(dataVals[_i].toFixed(2));
            }
        }
        // Set bar colors based on whether they're lower or higher than recommended

        var _this6$setColors = _this6.setColors(displayData, recLimLine, colors),
            _this6$setColors2 = _slicedToArray(_this6$setColors, 2),
            backgroundColors = _this6$setColors2[0],
            borderColors = _this6$setColors2[1];

        // Record everything in the state


        _this6.state = {
            months: monthData,
            dataVals: dataVals,
            displayData: displayData,
            colors: colors,
            backgroundColors: backgroundColors,
            borderColors: borderColors,
            recLimLine: recLimLine,
            maximumInstallmentsLabel: 'Fatura máxima recomendada',
            expenseCeilingLabel: 'Limite de gastos mensais',
            nextBillsLabel: 'Próximas faturas',
            predictedBillsLabel: 'Faturas estimadas',
            expenseCeilingLine: expenseCeilingLine,
            chart: null
        };
        return _this6;
    }

    _createClass(InstallmentsPlot, [{
        key: "defineMonthList",
        value: function defineMonthList() {
            var months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
            var monthData = [];
            var now = new Date();
            for (var i = now.getMonth(); i < 12; i++) {
                monthData.push(months[i]);
            }
            for (var _i2 = 0; _i2 < now.getMonth(); _i2++) {
                monthData.push(months[_i2]);
            }
            return monthData;
        }
    }, {
        key: "defineBasicColors",
        value: function defineBasicColors() {
            // Set basic colors for the plot
            var fillGreen = "rgba(147, 196, 45, 0.5)";
            var borderGreen = "rgba(147, 196, 45, 1)";
            var fillRed = "rgba(229, 97, 92, 0.5)";
            var borderRed = "rgba(229, 97, 92, 1)";
            var fillBlack = "rgba(61, 61, 61, 0.5)";
            var borderBlack = "rgba(61, 61, 61, 1)";
            var opaquePurple = "rgba(158, 27, 209, 1)";
            var transparentPurple = "rgba(158, 27, 209, 0.2)";
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
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            // Render the plot
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.state.months,
                    datasets: [{
                        label: 'Próximas faturas',
                        data: this.state.displayData,
                        backgroundColor: this.state.backgroundColors,
                        borderColor: this.state.borderColors,
                        borderWidth: 1
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
            this.setState({ chart: chart });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            // Include or exclude the predicted expenses
            if (this.props.includePredicted !== prevProps.includePredicted) {
                this.updateIncludePredicted();
            }
            // Change the installment distribution
            if (this.props.installments !== prevProps.installments) {
                this.updateInstallments();
            }
        }
    }, {
        key: "setColors",
        value: function setColors(newData, recommendedLimits) {
            var colors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state.colors;

            var backgroundColors = [];
            var borderColors = [];
            for (var i = 0; i < newData.length; i++) {
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
    }, {
        key: "updateIncludePredicted",
        value: function updateIncludePredicted() {
            // Update future bills and recommended limit
            var newData = this.state.chart.data.datasets[0].data;
            var limitLine = null;
            var billsLabel = null;
            var limitLabel = null;
            if (this.props.includePredicted) {
                limitLine = this.state.expenseCeilingLine;
                limitLabel = this.state.expenseCeilingLabel;
                billsLabel = this.state.predictedBillsLabel;
                for (var i = 0; i < newData.length; i++) {
                    newData[i] = (parseFloat(newData[i]) + this.props.predictedExpenses).toFixed(2);
                }
            } else {
                limitLine = this.state.recLimLine;
                limitLabel = this.state.maximumInstallmentsLabel;
                billsLabel = this.state.nextBillsLabel;
                for (var _i3 = 0; _i3 < newData.length; _i3++) {
                    newData[_i3] = (parseFloat(newData[_i3]) - this.props.predictedExpenses).toFixed(2);
                }
            }
            // Update colors

            var _setColors = this.setColors(newData, limitLine),
                _setColors2 = _slicedToArray(_setColors, 2),
                backgroundColors = _setColors2[0],
                borderColors = _setColors2[1];

            this.state.chart.data.datasets[0].data = newData;
            this.state.chart.data.datasets[0].backgroundColor = backgroundColors;
            this.state.chart.data.datasets[0].borderColor = borderColors;
            this.state.chart.data.datasets[0].label = billsLabel;
            this.state.chart.data.datasets[1].data = limitLine;
            this.state.chart.data.datasets[1].label = limitLabel;
            this.state.chart.update();
        }
    }, {
        key: "updateInstallments",
        value: function updateInstallments() {
            // Copy the original data values
            var newData = [];
            for (var i = 0; i < this.state.dataVals.length; i++) {
                newData.push(this.state.dataVals[i]);
            }
            // Include predicted expenses if necessary
            if (this.props.includePredicted) {
                for (var _i4 = 0; _i4 < newData.length; _i4++) {
                    newData[_i4] += this.props.predictedExpenses;
                }
            }
            // Add monthly installments
            var monthlyInstallment = this.props.price / this.props.installments;
            monthlyInstallment = parseFloat(monthlyInstallment.toFixed(2)); // 2 decimal places
            for (var _i5 = 0; _i5 < this.props.installments; _i5++) {
                newData[_i5] += monthlyInstallment;
                newData[_i5] = newData[_i5].toFixed(2);
            }
            // Update colors
            var colorResults = this.setColors(newData, this.state.chart.data.datasets[1].data);
            var backgroundColors = colorResults[0];
            var borderColors = colorResults[1];

            this.state.chart.data.datasets[0].data = newData;
            this.state.chart.data.datasets[0].backgroundColor = backgroundColors;
            this.state.chart.data.datasets[0].borderColor = borderColors;
            this.state.chart.update();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "center content-box plot-area" },
                React.createElement("canvas", { id: "myChart" })
            );
        }
    }]);

    return InstallmentsPlot;
}(React.Component);

var InstallmentsSlider = function (_React$Component6) {
    _inherits(InstallmentsSlider, _React$Component6);

    function InstallmentsSlider(props) {
        _classCallCheck(this, InstallmentsSlider);

        var _this7 = _possibleConstructorReturn(this, (InstallmentsSlider.__proto__ || Object.getPrototypeOf(InstallmentsSlider)).call(this, props));

        _this7.state = { installments: 1, monthlyInstallment: props.price.toFixed(2).replace('.', ',') };
        _this7.handleChange = _this7.handleChange.bind(_this7);
        return _this7;
    }

    _createClass(InstallmentsSlider, [{
        key: "handleChange",
        value: function handleChange() {
            var installments = document.getElementById("installments-slider").value;
            var monthlyInstallment = this.props.price / installments;
            monthlyInstallment = monthlyInstallment.toFixed(2).replace('.', ',');
            this.setState({ installments: installments, monthlyInstallment: monthlyInstallment });
            this.props.setInstallments(installments);
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            return React.createElement(
                "div",
                { className: "slide-container" },
                React.createElement(
                    "p",
                    { style: { marginBottom: 0, textAlign: "center" } },
                    "Quero fazer essa compra em ",
                    this.state.installments,
                    "X de R$",
                    this.state.monthlyInstallment
                ),
                React.createElement("input", { type: "range", min: "1", max: "12", defaultValue: "1", className: "slider", id: "installments-slider",
                    onChange: function onChange(event) {
                        return _this8.handleChange(event);
                    } })
            );
        }
    }]);

    return InstallmentsSlider;
}(React.Component);

var ItemPrice = function (_React$Component7) {
    _inherits(ItemPrice, _React$Component7);

    function ItemPrice() {
        _classCallCheck(this, ItemPrice);

        return _possibleConstructorReturn(this, (ItemPrice.__proto__ || Object.getPrototypeOf(ItemPrice)).apply(this, arguments));
    }

    _createClass(ItemPrice, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: { display: "flex", justifyContent: "space-between" } },
                React.createElement(
                    "p",
                    null,
                    "Valor da compra:"
                ),
                React.createElement(
                    "p",
                    null,
                    this.props.price
                )
            );
        }
    }]);

    return ItemPrice;
}(React.Component);

var PopupStats = function (_React$Component8) {
    _inherits(PopupStats, _React$Component8);

    function PopupStats(props) {
        _classCallCheck(this, PopupStats);

        return _possibleConstructorReturn(this, (PopupStats.__proto__ || Object.getPrototypeOf(PopupStats)).call(this, props));
    }

    _createClass(PopupStats, [{
        key: "render",
        value: function render() {
            var percentage = (this.props.price / this.props.income * 100).toFixed(1);
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    { style: { textAlign: "center" } },
                    "Qual o impacto nas suas finan\xE7as?"
                ),
                React.createElement(
                    "p",
                    null,
                    "Esse item representa ",
                    percentage,
                    "% da sua renda mensal"
                )
            );
        }
    }]);

    return PopupStats;
}(React.Component);

function PopupHeader() {
    return React.createElement(
        "div",
        { id: "header", style: { height: "40px" } },
        React.createElement("img", { src: "../../images/logo-white.png", style: { height: "100%" }, alt: "Nubank Logo" })
    );
}

var LearnMore = function (_React$Component9) {
    _inherits(LearnMore, _React$Component9);

    function LearnMore(props) {
        _classCallCheck(this, LearnMore);

        return _possibleConstructorReturn(this, (LearnMore.__proto__ || Object.getPrototypeOf(LearnMore)).call(this, props));
    }

    _createClass(LearnMore, [{
        key: "render",
        value: function render() {
            var fact = this.props.educationalFacts[Math.floor(Math.random() * this.props.educationalFacts.length)];
            return React.createElement(
                "div",
                { className: "content-box", style: { border: "5px", marginTop: "12px", padding: "3px" } },
                React.createElement(
                    "h1",
                    { style: { textAlign: "center", color: "#9e1bd1" } },
                    "Dicas Nubank"
                ),
                React.createElement(
                    "p",
                    { style: { color: "#9e1bd1" } },
                    fact
                )
            );
        }
    }]);

    return LearnMore;
}(React.Component);

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { type: "getPrice" }, renderPopup);
});

function renderPopup(response) {
    var priceStr = null;
    var priceVal = null;
    if (response) {
        priceStr = response.priceStr;
        priceVal = response.priceVal;
    }
    ReactDOM.render(React.createElement(PopupComponents, { priceStr: priceStr, priceVal: priceVal }), document.querySelector("#popup"));
}