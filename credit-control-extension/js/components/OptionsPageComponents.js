class OptionsPageComponents extends React.Component {
    constructor(props) {
        super(props);

        const pages = {
            DEFINITIONS: "Definições",
            ADD_EXPENSES: "Adicionar Gastos",
            SUPPORT: "Suporte"
        };

        this.state = {
            activePage: pages.DEFINITIONS,
            pages: pages
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
                        <PageContent activePage={this.state.activePage} pages={this.state.pages}/>
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
        return <DefinitionsPage/>
    } else if (props.activePage === props.pages.ADD_EXPENSES) {
        return <AddExpensesPage/>
    } else if (props.activePage === props.pages.SUPPORT) {
        return <SupportPage/>
    } else return null;
}

class DefinitionsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Insira sua renda mensal</h1>
            </div>
        )
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