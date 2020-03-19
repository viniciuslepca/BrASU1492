if (location.href.includes("/buy/")) {
    const priceStr = document.getElementById("subtotals-marketplace-table").getElementsByClassName("grand-total-price")[0].textContent.trim();
    const priceVal = parseFloat(priceStr.replace(/[^0-9.,]/g, '').replace(',', '.'));

    let income = null;
    chrome.runtime.sendMessage({
        type: "getIncome"
    }, notify);

    function shouldNotify() {
        const incomePercentTrigger = 0.1;
        return (priceVal / income) > incomePercentTrigger;
    }

    function notify(response) {
        income = response.income;
        if (shouldNotify()) {
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
                showDuration: 5000,

                // success, info, warning, error, and none
                theme: 'info'
            });

            const percent = ((priceVal / income) * 100).toFixed(1);
            priceNotification({
                title: 'Espere um momento!',
                message: `Essa compra representa ${percent}% da sua renda mensal. Clique no botão da extensão da Nubank para aprender mais.`
            });
        }
    }
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === "getPrice") {
            const priceStr = document.getElementById("subtotals-marketplace-table").getElementsByClassName("grand-total-price")[0].textContent.trim();
            const priceVal = parseFloat(priceStr.replace(/[^0-9.,]/g, '').replace(',', '.'));
            sendResponse({priceStr: priceStr, priceVal: priceVal});
        }
    });
}
