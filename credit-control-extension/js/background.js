window.priceStr = null;
window.priceVal = null;
window.income = 2000;

chrome.runtime.onMessage.addListener(function (request, sender) {
    // const options = {
    //     type: "basic",
    //     iconUrl: chrome.extension.getURL("../images/icon48.png"),
    //     title: "This is the title",
    //     message: "This is the main message of the notification",
    // };
    //
    // chrome.notifications.create("notifId", options, function() {console.log("Last error:", chrome.runtime.lastError);});

    window.priceStr = request.priceStr;
    window.priceVal = request.priceVal;
});

