
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

// Search input toggle
const coinLabel = document.getElementById("coin-label");
const coinSearch = document.getElementById("coin-search");
const coinInput = document.getElementById("coin-input");

function showSearch() {
    coinSearch.classList.add("visible");
    coinInput.value = "";
    coinInput.focus();
}

function hideSearch() {
    coinSearch.classList.remove("visible");
    coinInput.value = "";
}

coinLabel.addEventListener("click", function (e) {
    e.stopPropagation();
    showSearch();
});

coinInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        hideSearch();
    }
});

document.addEventListener("click", function (e) {
    if (!coinSearch.contains(e.target) && e.target !== coinLabel) {
        hideSearch();
    }
});
