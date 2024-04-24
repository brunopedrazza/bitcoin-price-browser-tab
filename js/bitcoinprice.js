
async function updateBitcoinPrice() {
    var response = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot", {
        method: "GET"
    })
    const responseBody = await response.text()
    const bodyObj = JSON.parse(responseBody)
    const bitcoinPrice = bodyObj.data.amount
    document.title = "$" + bitcoinPrice
}

updateBitcoinPrice()
setInterval(updateBitcoinPrice, 5000);