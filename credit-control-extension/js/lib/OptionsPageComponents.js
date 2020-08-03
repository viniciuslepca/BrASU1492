var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OptionsPageComponents = function (_React$Component) {
    _inherits(OptionsPageComponents, _React$Component);

    function OptionsPageComponents(props) {
        _classCallCheck(this, OptionsPageComponents);

        return _possibleConstructorReturn(this, (OptionsPageComponents.__proto__ || Object.getPrototypeOf(OptionsPageComponents)).call(this, props));
    }

    _createClass(OptionsPageComponents, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Sidebar, null),
                React.createElement(PageContent, null)
            );
        }
    }]);

    return OptionsPageComponents;
}(React.Component);

var PageContent = function (_React$Component2) {
    _inherits(PageContent, _React$Component2);

    function PageContent() {
        _classCallCheck(this, PageContent);

        return _possibleConstructorReturn(this, (PageContent.__proto__ || Object.getPrototypeOf(PageContent)).apply(this, arguments));
    }

    _createClass(PageContent, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "main" },
                React.createElement(
                    "div",
                    { id: "page-content" },
                    "Hello world"
                )
            );
        }
    }]);

    return PageContent;
}(React.Component);

var Sidebar = function (_React$Component3) {
    _inherits(Sidebar, _React$Component3);

    function Sidebar(props) {
        _classCallCheck(this, Sidebar);

        var _this3 = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

        var pages = {
            DEFINITIONS: "definitions",
            ADD_EXPENSES: "add expenses",
            SUPPORT: "support"
        };

        _this3.state = {
            activePage: pages.DEFINITIONS,
            pages: pages
        };

        return _this3;
    }

    _createClass(Sidebar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "sidebar" },
                React.createElement(SidebarHeader, null),
                React.createElement(
                    "a",
                    { href: "#" },
                    "Defini\xE7\xF5es"
                ),
                React.createElement(
                    "a",
                    { href: "#" },
                    "Adicionar gastos"
                ),
                React.createElement(
                    "a",
                    { href: "#" },
                    "Suporte"
                )
            );
        }
    }]);

    return Sidebar;
}(React.Component);

function SidebarElement(props) {}

function SidebarHeader() {
    return React.createElement(
        "div",
        { id: "sidebar-header" },
        React.createElement("img", { src: "../../images/logo-purple.png", alt: "Nu+ Logo" })
    );
}

ReactDOM.render(React.createElement(OptionsPageComponents, null), document.querySelector("#options"));