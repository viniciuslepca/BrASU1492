class OptionsPageComponents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Sidebar/>
                <PageContent/>
            </div>
        );
    }
}

class PageContent extends React.Component {
    render() {
        return (
            <div id="main">
                <div id="page-content">
                    Hello world
                </div>
            </div>
        )
    }
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        const pages = {
            DEFINITIONS: "definitions",
            ADD_EXPENSES: "add expenses",
            SUPPORT: "support"
        };

        this.state = {
            activePage: pages.DEFINITIONS,
            pages: pages
        }

    }

    render() {
        return (
            <div className="sidebar">
                <SidebarHeader/>
                <a href="#">Definições</a>
                <a href="#">Adicionar gastos</a>
                <a href="#">Suporte</a>
            </div>
        )
    }
}

function SidebarElement(props) {

}

function SidebarHeader() {
    return (
        <div id="sidebar-header">
            <img src="../../images/logo-purple.png" alt="Nu+ Logo"/>
        </div>
    );
}

ReactDOM.render(<OptionsPageComponents/>, document.querySelector("#options"));