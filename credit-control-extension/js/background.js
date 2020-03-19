window.price = null;
window.monthlyExpenses = null;

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.type === "setMonthlyExpenses") {
        window.monthlyExpenses = request.amt_total;
        console.log(window.monthlyExpenses);
    } else {
        window.price = request.price;
    }
});

