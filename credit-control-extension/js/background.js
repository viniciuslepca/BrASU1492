window.priceStr = null;
window.priceVal = null;
window.income = 2000;
window.bills = [1072, 980, 800, 800, 640, 640, 200, 200, 200, 0, 0, 0];
window.educationalFacts = [];
window.educationalFacts.push("84% dos consumidores já fizeram compras por impulso");
window.educationalFacts.push("Compras por impulso representam quase 40% das compras online");
window.educationalFacts.push("As compras por impulso mais comuns são de roupas, calçados e acessórios (19%)");
window.educationalFacts.push("Especialistas recomendam que você não comprometa mais de 30% da sua renda em prestações");
window.educationalFacts.push("64% dos consumidores têm compras parceladas em aberto");
window.educationalFacts.push("Para evitar endividamentos, pague o valor total da fatura do cartão sempre que puder");
window.educationalFacts.push("Acompanhe diariamente seus gastos do cartão de crédito");
window.educationalFacts.push("Em compras não emergenciais, evite parcelar: prefira economizar e obter descontos de compra à vista");

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

