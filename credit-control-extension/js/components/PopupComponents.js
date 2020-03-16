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
                    <PredictedBillsSwitch/>
                    <ContentBox/>
                    <InstallmentsSlider/>
                </div>
            );
        } else {
            return (
                <p>Please run this extension on Amazon's checkout page</p>
            );
        }
    }
}

class PredictedBillsSwitch extends React.Component {
    render() {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>Include predicted expenses</p>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="switch-slider round"/>
                </label>
            </div>
        );
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
    componentDidMount() {
        let ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
                datasets: [{
                    label: 'Future bills',
                    data: [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

    }

    render() {
        return (
            <canvas id="myChart" width="400" height="400"/>
        );
    }
}

class InstallmentsSlider extends React.Component {
    constructor() {
        super();
        this.state = {installments: 1}
    }

    render() {
        return(
            <div className="slide-container">
                <p style={{marginBottom: 0, textAlign: "center"}}>I want to buy this in {this.state.installments}X</p>
                <input type="range" min="1" max="12" value="1" className="slider" id="installments-slider"/>
            </div>
        );
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