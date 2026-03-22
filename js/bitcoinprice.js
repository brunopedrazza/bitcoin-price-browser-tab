
let currentCoin = localStorage.getItem("selectedCoin") || "BTC";

async function updatePrice() {
    try {
        var response = await fetch("https://api.coinbase.com/v2/prices/" + currentCoin + "-USD/spot", {
            method: "GET"
        })
        const responseBody = await response.text()
        const bodyObj = JSON.parse(responseBody)
        const price = bodyObj.data.amount
        document.title = currentCoin + " $" + price.split(".")[0]
        document.getElementById("coin-label").textContent = currentCoin;
        document.getElementById("btc-price-display").textContent = "$" + price.split(".")[0];
    } catch (e) {
        if (currentCoin !== "BTC") {
            currentCoin = "BTC";
            localStorage.setItem("selectedCoin", currentCoin);
            updatePrice();
        }
    }
}

function switchCoin(newCoin) {
    currentCoin = newCoin;
    localStorage.setItem("selectedCoin", currentCoin);
    updatePrice();
}

updatePrice()
setInterval(updatePrice, 5000);
