class PopupComponents extends React.Component {
    constructor(props) {
        super(props);
        const bg = chrome.extension.getBackgroundPage();
        this.state = {bg: bg};
    }

    render() {
        if (this.state.bg.price !== null) {
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
                <p className="purple-text">Sup</p>
            </div>
        )
    }
}

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