var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopupComponents = function (_React$Component) {
    _inherits(PopupComponents, _React$Component);

    function PopupComponents() {
        _classCallCheck(this, PopupComponents);

        return _possibleConstructorReturn(this, (PopupComponents.__proto__ || Object.getPrototypeOf(PopupComponents)).apply(this, arguments));
    }

    _createClass(PopupComponents, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(PopupTitle, null),
                React.createElement(ContentBox, null)
            );
        }
    }]);

    return PopupComponents;
}(React.Component);

var ContentBox = function (_React$Component2) {
    _inherits(ContentBox, _React$Component2);

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
                React.createElement(
                    "p",
                    { className: "purple-text" },
                    "Sup"
                )
            );
        }
    }]);

    return ContentBox;
}(React.Component);

function PopupTitle() {
    return React.createElement(
        "h1",
        { style: { textAlign: "center" } },
        "Nubank Credit Control Extension"
    );
}

ReactDOM.render(React.createElement(PopupComponents, null), document.querySelector("#popup-body"));