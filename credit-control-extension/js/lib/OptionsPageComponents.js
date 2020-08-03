var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OptionsPageComponents = function (_React$Component) {
    _inherits(OptionsPageComponents, _React$Component);

    function OptionsPageComponents(props) {
        _classCallCheck(this, OptionsPageComponents);

        var _this = _possibleConstructorReturn(this, (OptionsPageComponents.__proto__ || Object.getPrototypeOf(OptionsPageComponents)).call(this, props));

        var pages = {
            DEFINITIONS: "Definições",
            ADD_EXPENSES: "Adicionar Gastos",
            SUPPORT: "Suporte"
        };

        _this.state = {
            activePage: pages.DEFINITIONS,
            pages: pages
        };

        _this.setActivePage = _this.setActivePage.bind(_this);
        return _this;
    }

    _createClass(OptionsPageComponents, [{
        key: "setActivePage",
        value: function setActivePage(page) {
            this.setState({ activePage: page });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Sidebar, { activePage: this.state.activePage, pages: this.state.pages,
                    setActivePage: this.setActivePage }),
                React.createElement(
                    "div",
                    { id: "main" },
                    React.createElement(
                        "div",
                        { id: "page-content" },
                        React.createElement(PageContent, { activePage: this.state.activePage, pages: this.state.pages })
                    )
                )
            );
        }
    }]);

    return OptionsPageComponents;
}(React.Component);

/**
 * @return {null}
 */


function PageContent(props) {
    if (props.activePage === props.pages.DEFINITIONS) {
        return React.createElement(DefinitionsPage, null);
    } else if (props.activePage === props.pages.ADD_EXPENSES) {
        return React.createElement(AddExpensesPage, null);
    } else if (props.activePage === props.pages.SUPPORT) {
        return React.createElement(SupportPage, null);
    } else return null;
}

var DefinitionsPage = function (_React$Component2) {
    _inherits(DefinitionsPage, _React$Component2);

    function DefinitionsPage(props) {
        _classCallCheck(this, DefinitionsPage);

        return _possibleConstructorReturn(this, (DefinitionsPage.__proto__ || Object.getPrototypeOf(DefinitionsPage)).call(this, props));
    }

    _createClass(DefinitionsPage, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Insira sua renda mensal"
                )
            );
        }
    }]);

    return DefinitionsPage;
}(React.Component);

var AddExpensesPage = function (_React$Component3) {
    _inherits(AddExpensesPage, _React$Component3);

    function AddExpensesPage(props) {
        _classCallCheck(this, AddExpensesPage);

        return _possibleConstructorReturn(this, (AddExpensesPage.__proto__ || Object.getPrototypeOf(AddExpensesPage)).call(this, props));
    }

    _createClass(AddExpensesPage, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                "Add expenses!"
            );
        }
    }]);

    return AddExpensesPage;
}(React.Component);

var SupportPage = function (_React$Component4) {
    _inherits(SupportPage, _React$Component4);

    function SupportPage(props) {
        _classCallCheck(this, SupportPage);

        return _possibleConstructorReturn(this, (SupportPage.__proto__ || Object.getPrototypeOf(SupportPage)).call(this, props));
    }

    _createClass(SupportPage, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                "Support!"
            );
        }
    }]);

    return SupportPage;
}(React.Component);

function Sidebar(props) {
    return React.createElement(
        "div",
        { className: "sidebar" },
        React.createElement(SidebarHeader, null),
        React.createElement(SidebarElement, { setActivePage: props.setActivePage, activePage: props.activePage,
            title: props.pages.DEFINITIONS }),
        React.createElement(SidebarElement, { setActivePage: props.setActivePage, activePage: props.activePage,
            title: props.pages.ADD_EXPENSES }),
        React.createElement(SidebarElement, { setActivePage: props.setActivePage, activePage: props.activePage,
            title: props.pages.SUPPORT })
    );
}

var SidebarElement = function (_React$Component5) {
    _inherits(SidebarElement, _React$Component5);

    function SidebarElement() {
        _classCallCheck(this, SidebarElement);

        return _possibleConstructorReturn(this, (SidebarElement.__proto__ || Object.getPrototypeOf(SidebarElement)).apply(this, arguments));
    }

    _createClass(SidebarElement, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "a",
                { className: this.props.activePage === this.props.title ? "active" : undefined,
                    onClick: function onClick() {
                        return _this6.props.setActivePage(_this6.props.title);
                    } },
                this.props.title
            );
        }
    }]);

    return SidebarElement;
}(React.Component);

function SidebarHeader() {
    return React.createElement(
        "div",
        { id: "sidebar-header" },
        React.createElement("img", { src: "../../images/logo-purple.png", alt: "Nu+ Logo" })
    );
}

ReactDOM.render(React.createElement(OptionsPageComponents, null), document.querySelector("#options"));