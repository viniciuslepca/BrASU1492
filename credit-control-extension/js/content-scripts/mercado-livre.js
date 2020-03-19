window.addEventListener ("load", myMain, false);

function myMain () {
    const jsInitChecktimer = setInterval(checkForJS_Finish, 100);

    function checkForJS_Finish () {
        if (typeof document.getElementsByClassName("overview-component__payment")[0] != "undefined") {
            clearInterval (jsInitChecktimer);
            runScript();
        }
    }
}

function getPrice() {
    const priceElem = document.getElementsByClassName("overview-component__payment")[0];
    const priceTagSymbol = priceElem.getElementsByClassName("price-tag-symbol")[0].textContent;
    const priceIntPart = priceElem.getElementsByClassName("price-tag-fraction")[0].textContent;
    const priceFloatPart = priceElem.getElementsByClassName("price-tag-cents")[0].textContent;
    const priceStr = priceTagSymbol + priceIntPart + ',' + priceFloatPart;
    const priceVal = parseInt(priceIntPart) + parseInt(priceFloatPart)/100.0;
    return [priceStr, priceVal];
}

function runScript() {
    if (location.href.includes("/checkout/")) {
        const prices = getPrice();
        const priceVal = prices[1];

        chrome.runtime.sendMessage({
            type: "getIncome"
        }, notify);

        function shouldNotify(priceVal, income, incomePercentTrigger) {
            return (priceVal / income) > incomePercentTrigger;
        }

        function notify(response) {
            const income = response.income;
            const incomePercentTrigger = response.incomePercentTrigger;
            if (shouldNotify(priceVal, income, incomePercentTrigger)) {
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

                const percent = ((priceVal / income) * 100).toFixed(1).replace('.',',');
                priceNotification({
                    title: 'Espere um momento!',
                    message: `Essa compra representa ${percent}% da sua renda mensal. Clique no botão da extensão da Nubank para aprender mais.`
                });
            }
        }
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.type === "getPrice") {
                const prices = getPrice();
                const priceStr = prices[0];
                const priceVal = prices[1];
                sendResponse({priceStr: priceStr, priceVal: priceVal});
            }
        });
    }
}