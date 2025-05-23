
async function updateBitcoinPrice() {
    var response = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot", {
        method: "GET"
    })
    const responseBody = await response.text()
    const bodyObj = JSON.parse(responseBody)
    const bitcoinPrice = bodyObj.data.amount
    document.title = "$" + bitcoinPrice.split(".")[0]
    document.getElementById("btc-price-display").textContent = "$" + bitcoinPrice.split(".")[0];
}

updateBitcoinPrice()
setInterval(updateBitcoinPrice, 5000);