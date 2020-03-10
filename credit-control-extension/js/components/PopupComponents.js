class PopupComponents extends React.Component {
    render() {
        return (
            <div>
                {/*<script src="../popup.js"/>*/}
                <PopupTitle/>
                <ContentBox/>
            </div>
        );
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

function PopupTitle() {
    return <h1 style={{textAlign: "center"}}>Nubank Credit Control Extension</h1>
}

ReactDOM.render(React.createElement(PopupComponents, null), document.querySelector("#popup-body"));