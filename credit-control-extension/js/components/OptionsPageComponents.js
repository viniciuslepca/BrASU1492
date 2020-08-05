class OptionsPageComponents extends React.Component {
    constructor(props) {
        super(props);

        const pages = {
            DEFINITIONS: "Definições",
            ADD_EXPENSES: "Adicionar Gastos",
            SUPPORT: "Suporte"
        };

        // Get firebase reference
        Firebase.enableLogging(true);
        let firebase = new Firebase('https://nubank-credit-control.firebaseio.com');
        const userId = "u142652";
        let userRef = firebase.child('users/' + userId);

        this.state = {
            activePage: pages.DEFINITIONS,
            pages: pages,
            firebase: firebase,
            userRef: userRef
        };

        this.setActivePage = this.setActivePage.bind(this);
    }

    setActivePage(page) {
        this.setState({activePage: page});
    }

    render() {
        return (
            <div>
                <Sidebar activePage={this.state.activePage} pages={this.state.pages}
                         setActivePage={this.setActivePage}/>
                <div id="main">
                    <div id="page-content">
                        <PageContent activePage={this.state.activePage} pages={this.state.pages}
                                     firebase={this.state.firebase} userRef={this.state.userRef}/>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * @return {null}
 */
function PageContent(props) {
    if (props.activePage === props.pages.DEFINITIONS) {
        return <DefinitionsPage firebase={props.firebase} userRef={props.userRef}/>
    } else if (props.activePage === props.pages.ADD_EXPENSES) {
        return <AddExpensesPage firebase={props.firebase} userRef={props.userRef}/>
    } else if (props.activePage === props.pages.SUPPORT) {
        return <SupportPage/>
    } else return null;
}

class DefinitionsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultIncome: undefined,
            fixedExpenses: []
        }
    }

    setDefaultIncome() {
        // this.props.firebase.on("value", (snapshot) => {
        //     this.setState({defaultIncome: snapshot.child("users").child("u142652").child("income").val()});
        // });
        this.props.userRef.on("value", snapshot => {
            this.setState({defaultIncome: snapshot.child("income").val()});
        })
    }

    setIncome(value) {
        return null;
    }

    componentDidMount() {
        this.setDefaultIncome();
    }

    render() {
        return (
            <div id="definitions-page">
                <IncomeForm defaultIncome={this.state.defaultIncome}/>
                <FixedExpensesForm/>
            </div>
        )
    }
}

class IncomeForm extends React.Component {
    render() {
        return (
            <div id="income-form">
                <h1>Insira sua renda mensal</h1>
                &nbsp;&nbsp;&nbsp;&nbsp;<span>R$ </span><input onBlur={(event) => console.log(event.target.value)}
                                                               type="number" min="0.01" step="0.01"
                                                               defaultValue={this.props.defaultIncome}/>
            </div>
        )
    }
}

class FixedExpensesForm extends React.Component {
    render() {
        return null;
    }
}

class AddExpensesPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Add expenses!
            </div>
        )
    }
}

class SupportPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Support!
            </div>
        )
    }
}

function Sidebar(props) {
    return (
        <div className="sidebar">
            <SidebarHeader/>
            <SidebarElement setActivePage={props.setActivePage} activePage={props.activePage}
                            title={props.pages.DEFINITIONS}/>
            <SidebarElement setActivePage={props.setActivePage} activePage={props.activePage}
                            title={props.pages.ADD_EXPENSES}/>
            <SidebarElement setActivePage={props.setActivePage} activePage={props.activePage}
                            title={props.pages.SUPPORT}/>
        </div>
    )
}

class SidebarElement extends React.Component {
    render() {
        return (
            <a className={this.props.activePage === this.props.title ? "active" : undefined}
               onClick={() => this.props.setActivePage(this.props.title)}>{this.props.title}</a>
        )
    }
}

function SidebarHeader() {
    return (
        <div id="sidebar-header">
            <img src="../../images/logo-purple.png" alt="Nu+ Logo"/>
        </div>
    );
}

ReactDOM.render(<OptionsPageComponents/>, document.querySelector("#options"));