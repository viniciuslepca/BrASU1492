window.bears = {};
chrome.runtime.onMessage.addListener(function (request) {
    window.bears[request.url] = request.count
});

chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({url: 'popup.html'})
});