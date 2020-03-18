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
            if (this.state.bg.priceStr !== null) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(PopupTitle, null),
                    React.createElement(ItemPrice, { price: this.state.bg.priceStr }),
                    React.createElement(ContentComponents, { price: this.state.bg.priceVal })
                );
            } else {
                return React.createElement(
                    "p",
                    null,
                    "Please run this extension on Amazon's checkout page"
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

        var predictedExpenses = 200;
        _this2.state = { includePredicted: false, predictedExpenses: predictedExpenses, installments: 1 };
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
                React.createElement(PredictedBillsSwitch, { setIncludePredicted: this.setIncludePredicted.bind(this), predictedExpenses: this.state.predictedExpenses }),
                React.createElement(InstallmentsPlot, { includePredicted: this.state.includePredicted, predictedExpenses: this.state.predictedExpenses,
                    price: this.props.price, installments: this.state.installments }),
                React.createElement(InstallmentsSlider, { setInstallments: this.setInstallments.bind(this) })
            );
        }
    }]);

    return ContentComponents;
}(React.Component);

var PredictedBillsSwitch = function (_React$Component3) {
    _inherits(PredictedBillsSwitch, _React$Component3);

    function PredictedBillsSwitch(props) {
        _classCallCheck(this, PredictedBillsSwitch);

        var _this3 = _possibleConstructorReturn(this, (PredictedBillsSwitch.__proto__ || Object.getPrototypeOf(PredictedBillsSwitch)).call(this, props));

        _this3.handleChange = _this3.handleChange.bind(_this3);
        return _this3;
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
                    "Include predicted expenses ($",
                    this.props.predictedExpenses,
                    "/month)"
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

var InstallmentsPlot = function (_React$Component4) {
    _inherits(InstallmentsPlot, _React$Component4);

    function InstallmentsPlot(props) {
        _classCallCheck(this, InstallmentsPlot);

        var _this4 = _possibleConstructorReturn(this, (InstallmentsPlot.__proto__ || Object.getPrototypeOf(InstallmentsPlot)).call(this, props));

        var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var dataVals = [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0];
        // Set basic colors for the plot
        var fillGreen = "rgba(147, 196, 45, 0.5)";
        var borderGreen = "rgba(147, 196, 45, 1)";
        var fillRed = "rgba(229, 97, 92, 0.5)";
        var borderRed = "rgba(229, 97, 92, 1)";
        var colors = { fillGreen: fillGreen, borderGreen: borderGreen, fillRed: fillRed, borderRed: borderRed };
        // Define recommended maximum monthly expense
        var recommendedLimit = 800;
        var recLimLine = [];
        for (var i = 0; i < dataVals.length; i++) {
            recLimLine.push(recommendedLimit);
        }
        // Include price of the item in 1 installment for first render
        var displayData = [];
        for (var _i = 0; _i < dataVals.length; _i++) {
            if (_i === 0) {
                // Assuming the initial state is a single installment
                displayData.push(dataVals[_i] + props.price);
            } else {
                displayData.push(dataVals[_i]);
            }
        }
        // Set bar colors based on whether they're lower or higher than recommended
        var backgroundColors = [];
        var borderColors = [];
        for (var _i2 = 0; _i2 < displayData.length; _i2++) {
            if (displayData[_i2] >= recommendedLimit) {
                backgroundColors.push(colors.fillRed);
                borderColors.push(colors.borderRed);
            } else {
                backgroundColors.push(colors.fillGreen);
                borderColors.push(colors.borderGreen);
            }
        }

        // Record everything in the state
        _this4.state = { months: months, dataVals: dataVals, displayData: displayData, colors: colors,
            backgroundColors: backgroundColors, borderColors: borderColors,
            recommendedLimit: recommendedLimit, recLimLine: recLimLine, chart: null };
        return _this4;
    }

    _createClass(InstallmentsPlot, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            // Render the plot
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
                    datasets: [{
                        label: 'Future bills (red if higher than recommended)',
                        data: this.state.displayData,
                        backgroundColor: this.state.backgroundColors,
                        borderColor: this.state.borderColors,
                        borderWidth: 1
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
                                beginAtZero: false,
                                fontColor: "#9e1bd1"
                            },
                            gridLines: {
                                drawOnChartArea: false,
                                color: "rgba(158, 27, 209, 0.2)"
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "#9e1bd1"
                            },
                            gridLines: {
                                drawOnChartArea: false,
                                color: "rgba(158, 27, 209, 0.2)"
                            }
                        }]
                    },
                    legend: {
                        labels: {
                            fontColor: "#9e1bd1"
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
        key: "updateIncludePredicted",
        value: function updateIncludePredicted() {
            var newData = this.state.chart.data.datasets[0].data;
            if (this.props.includePredicted) {
                for (var i = 0; i < newData.length; i++) {
                    newData[i] += this.props.predictedExpenses;
                }
            } else {
                for (var _i3 = 0; _i3 < newData.length; _i3++) {
                    newData[_i3] -= this.props.predictedExpenses;
                }
            }
            // Update colors
            var backgroundColors = [];
            var borderColors = [];
            for (var _i4 = 0; _i4 < newData.length; _i4++) {
                if (newData[_i4] >= this.state.recommendedLimit) {
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
                for (var _i5 = 0; _i5 < newData.length; _i5++) {
                    newData[_i5] += this.props.predictedExpenses;
                }
            }
            // Add monthly installments
            var monthlyInstallment = this.props.price / this.props.installments;
            monthlyInstallment = parseFloat(monthlyInstallment.toFixed(2)); // 2 decimal places
            for (var _i6 = 0; _i6 < this.props.installments; _i6++) {
                newData[_i6] += monthlyInstallment;
            }
            // Update colors
            var backgroundColors = [];
            var borderColors = [];
            for (var _i7 = 0; _i7 < newData.length; _i7++) {
                if (newData[_i7] >= this.state.recommendedLimit) {
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
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "center content-box" },
                React.createElement("canvas", { id: "myChart", width: "400", height: "400" })
            );
        }
    }]);

    return InstallmentsPlot;
}(React.Component);

var InstallmentsSlider = function (_React$Component5) {
    _inherits(InstallmentsSlider, _React$Component5);

    function InstallmentsSlider() {
        _classCallCheck(this, InstallmentsSlider);

        var _this5 = _possibleConstructorReturn(this, (InstallmentsSlider.__proto__ || Object.getPrototypeOf(InstallmentsSlider)).call(this));

        _this5.state = { installments: 1 };
        return _this5;
    }

    _createClass(InstallmentsSlider, [{
        key: "handleChange",
        value: function handleChange() {
            var value = document.getElementById("installments-slider").value;
            this.setState({ installments: value });
            this.props.setInstallments(value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "div",
                { className: "slide-container" },
                React.createElement(
                    "p",
                    { style: { marginBottom: 0, textAlign: "center" } },
                    "I want to buy this in ",
                    this.state.installments,
                    "X"
                ),
                React.createElement("input", { type: "range", min: "1", max: "12", defaultValue: "1", className: "slider", id: "installments-slider", onChange: function onChange(event) {
                        return _this6.handleChange(event);
                    } })
            );
        }
    }]);

    return InstallmentsSlider;
}(React.Component);

var ItemPrice = function (_React$Component6) {
    _inherits(ItemPrice, _React$Component6);

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
                    "Item price:"
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

function PopupTitle() {
    return React.createElement(
        "h1",
        { style: { textAlign: "center" } },
        "Nubank Credit Control Extension"
    );
}

ReactDOM.render(React.createElement(PopupComponents, null), document.querySelector("#popup-body"));