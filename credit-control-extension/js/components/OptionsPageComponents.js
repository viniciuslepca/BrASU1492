class OptionsPageComponents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar/>
                <PageContent/>
            </div>
        );
    }
}

class PageContent extends React.Component {
    render() {
        return (
            <p>Hello world</p>
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
            <div id="sidebar">
                <SidebarHeader/>

            </div>
        )
    }
}

function SidebarElement(props) {

}

function SidebarHeader() {
    return (
        <div className="sidebar-header">
            <img src="../../images/logo-white.png" alt="Nu+ Logo"/>
        </div>
    );
}

ReactDOM.render(<OptionsPageComponents/>, document.querySelector("#options"));