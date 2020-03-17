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
            // TODO FIX THIS LATER - SHOULD BE if(this.state.bg.price !== null)
            if (this.state.bg.price !== null || true) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(PopupTitle, null),
                    React.createElement(ItemPrice, { price: this.state.bg.price }),
                    React.createElement(SwitchAndContentBox, null),
                    React.createElement(InstallmentsSlider, null)
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

var SwitchAndContentBox = function (_React$Component2) {
    _inherits(SwitchAndContentBox, _React$Component2);

    function SwitchAndContentBox(props) {
        _classCallCheck(this, SwitchAndContentBox);

        var _this2 = _possibleConstructorReturn(this, (SwitchAndContentBox.__proto__ || Object.getPrototypeOf(SwitchAndContentBox)).call(this, props));

        _this2.state = { includePredicted: false };
        return _this2;
    }

    _createClass(SwitchAndContentBox, [{
        key: "setIncludePredicted",
        value: function setIncludePredicted(checked) {
            this.setState({ includePredicted: checked });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(PredictedBillsSwitch, { setIncludePredicted: this.setIncludePredicted.bind(this) }),
                React.createElement(ContentBox, { includePredicted: this.state.includePredicted })
            );
        }
    }]);

    return SwitchAndContentBox;
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
                    "Include predicted expenses"
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

var ContentBox = function (_React$Component4) {
    _inherits(ContentBox, _React$Component4);

    function ContentBox(props) {
        _classCallCheck(this, ContentBox);

        return _possibleConstructorReturn(this, (ContentBox.__proto__ || Object.getPrototypeOf(ContentBox)).call(this, props));
    }

    _createClass(ContentBox, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "center content-box" },
                React.createElement(InstallmentsPlot, { includePredicted: this.props.includePredicted })
            );
        }
    }]);

    return ContentBox;
}(React.Component);

var InstallmentsPlot = function (_React$Component5) {
    _inherits(InstallmentsPlot, _React$Component5);

    function InstallmentsPlot(props) {
        _classCallCheck(this, InstallmentsPlot);

        var _this5 = _possibleConstructorReturn(this, (InstallmentsPlot.__proto__ || Object.getPrototypeOf(InstallmentsPlot)).call(this, props));

        var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var dataVals = [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0];
        var predictedExpenses = 200;
        var fillGreen = "rgba(147, 196, 45, 0.5)";
        var borderGreen = "rgba(147, 196, 45, 1)";
        var fillRed = "rgba(229, 97, 92, 0.5)";
        var borderRed = "rgba(229, 97, 92, 1)";
        var colors = { fillGreen: fillGreen, borderGreen: borderGreen, fillRed: fillRed, borderRed: borderRed };
        var recommendedLimit = 800;
        var recLimLine = [];
        for (var i = 0; i < dataVals.length; i++) {
            recLimLine.push(recommendedLimit);
        }
        var backgroundColors = [];
        var borderColors = [];
        for (var _i = 0; _i < dataVals.length; _i++) {
            if (dataVals[_i] >= recommendedLimit) {
                backgroundColors.push(colors.fillRed);
                borderColors.push(colors.borderRed);
            } else {
                backgroundColors.push(colors.fillGreen);
                borderColors.push(colors.borderGreen);
            }
        }
        _this5.state = { months: months, dataVals: dataVals, colors: colors, recommendedLimit: recommendedLimit, recLimLine: recLimLine,
            backGroundColors: backgroundColors, borderColors: borderColors, predictedExpenses: predictedExpenses, chart: null };
        return _this5;
    }

    _createClass(InstallmentsPlot, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
                    datasets: [{
                        label: 'Future bills (red if higher than recommended)',
                        data: this.state.dataVals,
                        backgroundColor: this.state.backGroundColors,
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
                                beginAtZero: true
                            }
                        }]
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
            if (this.props.includePredicted !== prevProps.includePredicted) {
                var newData = this.state.chart.data.datasets[0].data;
                if (this.props.includePredicted) {
                    for (var i = 0; i < newData.length; i++) {
                        newData[i] += this.state.predictedExpenses;
                    }
                } else {
                    for (var _i2 = 0; _i2 < newData.length; _i2++) {
                        newData[_i2] -= this.state.predictedExpenses;
                    }
                }
                var _backgroundColors = [];
                var _borderColors = [];
                for (var _i3 = 0; _i3 < newData.length; _i3++) {
                    if (newData[_i3] >= this.state.recommendedLimit) {
                        _backgroundColors.push(this.state.colors.fillRed);
                        _borderColors.push(this.state.colors.borderRed);
                    } else {
                        _backgroundColors.push(this.state.colors.fillGreen);
                        _borderColors.push(this.state.colors.borderGreen);
                    }
                }
                this.state.chart.data.datasets[0].data = newData;
                this.state.chart.data.datasets[0].backgroundColor = _backgroundColors;
                this.state.chart.data.datasets[0].borderColor = _borderColors;
                this.state.chart.update();
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("canvas", { id: "myChart", width: "400", height: "400" });
        }
    }]);

    return InstallmentsPlot;
}(React.Component);

var InstallmentsSlider = function (_React$Component6) {
    _inherits(InstallmentsSlider, _React$Component6);

    function InstallmentsSlider() {
        _classCallCheck(this, InstallmentsSlider);

        var _this6 = _possibleConstructorReturn(this, (InstallmentsSlider.__proto__ || Object.getPrototypeOf(InstallmentsSlider)).call(this));

        _this6.state = { installments: 1 };
        return _this6;
    }

    _createClass(InstallmentsSlider, [{
        key: "handleChange",
        value: function handleChange() {
            var value = document.getElementById("installments-slider").value;
            this.setState({ installments: value });
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

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
                        return _this7.handleChange(event);
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