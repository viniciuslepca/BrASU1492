window.priceStr = null;
window.priceVal = null;
window.income = 2000;
window.bills = [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0];
window.educationalStats = [];
window.educationalStats.push("84% dos consumidores já fizeram compras por impulso");
window.educationalStats.push("Compras por impulso representam quase 40% das compras online");


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
    sendResponse({income: window.income});
});

