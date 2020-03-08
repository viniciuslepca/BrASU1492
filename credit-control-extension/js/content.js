// const itemDetailsDiv = document.getElementsByClassName("a-fixed-left-grid-col item-details-right-column a-col-right");
// const stuff = itemDetailsDiv[0].getElementsByClassName("a-text-bold");

const price = document.getElementById("subtotals-marketplace-table").getElementsByClassName("grand-total-price")[0].textContent;

chrome.runtime.sendMessage({
    price: price
});