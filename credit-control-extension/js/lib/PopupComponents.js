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
                    React.createElement(PredictedBillsSwitch, null),
                    React.createElement(ContentBox, null),
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

var PredictedBillsSwitch = function (_React$Component2) {
    _inherits(PredictedBillsSwitch, _React$Component2);

    function PredictedBillsSwitch() {
        _classCallCheck(this, PredictedBillsSwitch);

        return _possibleConstructorReturn(this, (PredictedBillsSwitch.__proto__ || Object.getPrototypeOf(PredictedBillsSwitch)).apply(this, arguments));
    }

    _createClass(PredictedBillsSwitch, [{
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
                    React.createElement("input", { type: "checkbox" }),
                    React.createElement("span", { className: "switch-slider round" })
                )
            );
        }
    }]);

    return PredictedBillsSwitch;
}(React.Component);

var ContentBox = function (_React$Component3) {
    _inherits(ContentBox, _React$Component3);

    function ContentBox() {
        _classCallCheck(this, ContentBox);

        return _possibleConstructorReturn(this, (ContentBox.__proto__ || Object.getPrototypeOf(ContentBox)).apply(this, arguments));
    }

    _createClass(ContentBox, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "center content-box" },
                React.createElement(InstallmentsPlot, null)
            );
        }
    }]);

    return ContentBox;
}(React.Component);

var InstallmentsPlot = function (_React$Component4) {
    _inherits(InstallmentsPlot, _React$Component4);

    function InstallmentsPlot(props) {
        _classCallCheck(this, InstallmentsPlot);

        var _this4 = _possibleConstructorReturn(this, (InstallmentsPlot.__proto__ || Object.getPrototypeOf(InstallmentsPlot)).call(this, props));

        var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var dataVals = [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0];
        var fillGreen = "rgba(147, 196, 45, 0.5)";
        var borderGreen = "rgba(147, 196, 45, 1)";
        var fillRed = "rgba(229, 97, 92, 0.5)";
        var borderRed = "rgba(229, 97, 92, 1)";
        var colors = { fillGreen: fillGreen, borderGreen: borderGreen, fillRed: fillRed, borderRed: borderRed };
        var recommendedLimit = 800;
        var backgroundColors = [];
        var borderColors = [];
        for (var i = 0; i < dataVals.length; i++) {
            if (dataVals[i] >= recommendedLimit) {
                backgroundColors.push(colors.fillRed);
                borderColors.push(colors.borderRed);
            } else {
                backgroundColors.push(colors.fillGreen);
                borderColors.push(colors.borderGreen);
            }
        }
        _this4.state = { months: months, dataVals: dataVals, colors: colors,
            recommendedLimit: recommendedLimit, backGroundColors: backgroundColors, borderColors: borderColors };
        return _this4;
    }

    _createClass(InstallmentsPlot, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var ctx = document.getElementById('myChart').getContext('2d');
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
    }, {
        key: "render",
        value: function render() {
            return React.createElement("canvas", { id: "myChart", width: "400", height: "400" });
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
            console.log(value);
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