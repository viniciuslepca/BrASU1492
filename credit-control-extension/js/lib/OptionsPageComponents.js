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

        // Get firebase reference
        Firebase.enableLogging(true);
        var firebase = new Firebase('https://nubank-credit-control.firebaseio.com');
        var userId = "u142652";
        var userRef = firebase.child('users/' + userId);

        _this.state = {
            activePage: pages.DEFINITIONS,
            pages: pages,
            firebase: firebase,
            userRef: userRef
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
                        React.createElement(PageContent, { activePage: this.state.activePage, pages: this.state.pages,
                            firebase: this.state.firebase, userRef: this.state.userRef })
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
        return React.createElement(DefinitionsPage, { firebase: props.firebase, userRef: props.userRef });
    } else if (props.activePage === props.pages.ADD_EXPENSES) {
        return React.createElement(AddExpensesPage, { firebase: props.firebase, userRef: props.userRef });
    } else if (props.activePage === props.pages.SUPPORT) {
        return React.createElement(SupportPage, null);
    } else return null;
}

var DefinitionsPage = function (_React$Component2) {
    _inherits(DefinitionsPage, _React$Component2);

    function DefinitionsPage(props) {
        _classCallCheck(this, DefinitionsPage);

        var _this2 = _possibleConstructorReturn(this, (DefinitionsPage.__proto__ || Object.getPrototypeOf(DefinitionsPage)).call(this, props));

        _this2.state = {
            defaultIncome: undefined,
            fixedExpenses: []
        };
        return _this2;
    }

    _createClass(DefinitionsPage, [{
        key: "setDefaultIncome",
        value: function setDefaultIncome() {
            var _this3 = this;

            // this.props.firebase.on("value", (snapshot) => {
            //     this.setState({defaultIncome: snapshot.child("users").child("u142652").child("income").val()});
            // });
            this.props.userRef.on("value", function (snapshot) {
                _this3.setState({ defaultIncome: snapshot.child("income").val() });
            });
        }
    }, {
        key: "setIncome",
        value: function setIncome(value) {
            return null;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setDefaultIncome();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "definitions-page" },
                React.createElement(IncomeForm, { defaultIncome: this.state.defaultIncome }),
                React.createElement(FixedExpensesForm, null)
            );
        }
    }]);

    return DefinitionsPage;
}(React.Component);

var IncomeForm = function (_React$Component3) {
    _inherits(IncomeForm, _React$Component3);

    function IncomeForm() {
        _classCallCheck(this, IncomeForm);

        return _possibleConstructorReturn(this, (IncomeForm.__proto__ || Object.getPrototypeOf(IncomeForm)).apply(this, arguments));
    }

    _createClass(IncomeForm, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "income-form" },
                React.createElement(
                    "h1",
                    null,
                    "Insira sua renda mensal"
                ),
                "\xA0\xA0\xA0\xA0",
                React.createElement(
                    "span",
                    null,
                    "R$ "
                ),
                React.createElement("input", { onBlur: function onBlur(event) {
                        return console.log(event.target.value);
                    },
                    type: "number", min: "0.01", step: "0.01",
                    defaultValue: this.props.defaultIncome })
            );
        }
    }]);

    return IncomeForm;
}(React.Component);

var FixedExpensesForm = function (_React$Component4) {
    _inherits(FixedExpensesForm, _React$Component4);

    function FixedExpensesForm() {
        _classCallCheck(this, FixedExpensesForm);

        return _possibleConstructorReturn(this, (FixedExpensesForm.__proto__ || Object.getPrototypeOf(FixedExpensesForm)).apply(this, arguments));
    }

    _createClass(FixedExpensesForm, [{
        key: "render",
        value: function render() {
            return null;
        }
    }]);

    return FixedExpensesForm;
}(React.Component);

var AddExpensesPage = function (_React$Component5) {
    _inherits(AddExpensesPage, _React$Component5);

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

var SupportPage = function (_React$Component6) {
    _inherits(SupportPage, _React$Component6);

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

var SidebarElement = function (_React$Component7) {
    _inherits(SidebarElement, _React$Component7);

    function SidebarElement() {
        _classCallCheck(this, SidebarElement);

        return _possibleConstructorReturn(this, (SidebarElement.__proto__ || Object.getPrototypeOf(SidebarElement)).apply(this, arguments));
    }

    _createClass(SidebarElement, [{
        key: "render",
        value: function render() {
            var _this9 = this;

            return React.createElement(
                "a",
                { className: this.props.activePage === this.props.title ? "active" : undefined,
                    onClick: function onClick() {
                        return _this9.props.setActivePage(_this9.props.title);
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