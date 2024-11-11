// Initialize search bar HTML elements
const searchbar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBar input");
const searchIconPart = document.querySelector(".searchLogoSide");

// Search input focus on search bar click
searchbar.addEventListener("click", () => {
    searchInput.focus()
})

// Get cryptos infos part
const cryptosToFind = [
    "BTC",
    "ETH",
    "LTC"
];
const socketToApi = new WebSocket('wss://ws.coinapi.io/v1/');