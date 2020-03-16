// const itemDetailsDiv = document.getElementsByClassName("a-fixed-left-grid-col item-details-right-column a-col-right");
// const stuff = itemDetailsDiv[0].getElementsByClassName("a-text-bold");

const price = document.getElementById("subtotals-marketplace-table").getElementsByClassName("grand-total-price")[0].textContent;

chrome.runtime.sendMessage({
    price: price
});

const priceNotification = window.createNotification({
    // close on click
    closeOnClick: false,

    // displays close button
    displayCloseButton: true,

    // nfc-top-left
    // nfc-bottom-right
    // nfc-bottom-left
    positionClass: 'nfc-top-right',

    // callback
    onclick: false,

    // timeout in milliseconds
    showDuration: 10000,

    // success, info, warning, error, and none
    theme: 'info'
});

priceNotification({
    title: 'Wait a second!',
    message: 'This purchase represents X% of your monthly income. Click on the Nubank extension icon to learn more about it.'
});

// chrome.runtime.onMessage.addListener(function(request, sender) {
//     console.log(sender.tab ?
//         "from a content script:" + sender.tab.url :
//         "from the extension");
//
//     if (request.type === "getPrice") {
//         chrome.runtime.sendMessage({price: price});
//     }
// });
