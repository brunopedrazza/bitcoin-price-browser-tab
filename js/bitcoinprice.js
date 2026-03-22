
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

let priceInterval;

function startPolling() {
    clearInterval(priceInterval);
    updatePrice();
    priceInterval = setInterval(updatePrice, 5000);
}

startPolling();

// Search input toggle
const coinLabel = document.getElementById("coin-label");
const coinSearch = document.getElementById("coin-search");
const coinInput = document.getElementById("coin-input");
const coinError = document.getElementById("coin-error");

function showSearch() {
    coinSearch.classList.add("visible");
    coinInput.value = "";
    coinInput.focus();
}

function hideSearch() {
    coinSearch.classList.remove("visible");
    coinInput.value = "";
    coinError.textContent = "";
}

coinLabel.addEventListener("click", function (e) {
    e.stopPropagation();
    showSearch();
});

coinInput.addEventListener("keydown", async function (e) {
    if (e.key === "Escape") {
        hideSearch();
        return;
    }
    if (e.key === "Enter") {
        const code = coinInput.value.trim().toUpperCase();
        if (!code) return;
        try {
            const response = await fetch("https://api.coinbase.com/v2/prices/" + code + "-USD/spot");
            const data = await response.json();
            if (data.data && data.data.amount) {
                currentCoin = code;
                localStorage.setItem("selectedCoin", currentCoin);
                hideSearch();
                startPolling();
            } else {
                coinError.textContent = "Coin not found";
            }
        } catch (err) {
            coinError.textContent = "Coin not found";
        }
    }
});

coinInput.addEventListener("input", function () {
    coinError.textContent = "";
});

document.addEventListener("click", function (e) {
    if (!coinSearch.contains(e.target) && e.target !== coinLabel) {
        hideSearch();
    }
});
