
let currentCoin = "BTC";

async function updatePrice() {
    var response = await fetch("https://api.coinbase.com/v2/prices/" + currentCoin + "-USD/spot", {
        method: "GET"
    })
    const responseBody = await response.text()
    const bodyObj = JSON.parse(responseBody)
    const price = bodyObj.data.amount
    document.title = currentCoin + " $" + price.split(".")[0]
    document.getElementById("coin-label").textContent = currentCoin;
    document.getElementById("btc-price-display").textContent = "$" + price.split(".")[0];
}

updatePrice()
setInterval(updatePrice, 5000);
