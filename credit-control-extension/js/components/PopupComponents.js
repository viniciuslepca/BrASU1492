class PopupComponents extends React.Component {
    constructor(props) {
        super(props);
        const bg = chrome.extension.getBackgroundPage();
        this.state = {bg: bg};
    }

    render() {
        // TODO FIX THIS LATER - SHOULD BE if(this.state.bg.price !== null)
        if (this.state.bg.price !== null || true) {
            return(
                <div>
                    <PopupTitle/>
                    <ItemPrice price={this.state.bg.price}/>
                    <ContentBox/>
                </div>
            );
        } else {
            return (
                <p>Please run this extension on Amazon's checkout page</p>
            );
        }
    }
}

class ContentBox extends React.Component {
    render() {
        return (
            <div className="center content-box">
                <InstallmentsPlot/>
            </div>
        )
    }
}

class InstallmentsPlot extends React.Component {
    render() {
        return (
            <div className="graph-wrapper">
                <div className="graph">
                    {/*<Bar left={0}/>*/}
                    {/*<Bar left={10}/>*/}
                    {/*<Bar left={20}/>*/}
                </div>
            </div>
        );
    }
}

// function Bar(left) {
//     return (
//         <div className="bar" style={{left: `${left}%`}}/>
//     );
// }

class ItemPrice extends React.Component {
    render() {
        return (
            <p>Item price: {this.props.price}</p>
        );
    }

}

function PopupTitle() {
    return <h1 style={{textAlign: "center"}}>Nubank Credit Control Extension</h1>
}

ReactDOM.render(<PopupComponents/>, document.querySelector("#popup-body"));