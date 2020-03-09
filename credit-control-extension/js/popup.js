document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage();

    const priceDiv = document.createElement('p');
    priceDiv.textContent = `Item price: ${bg.price}`;
    document.getElementById("popup-body").appendChild(priceDiv);
}, false);