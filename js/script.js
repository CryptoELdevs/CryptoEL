

// Initialize search bar HTML elements
const searchbar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBar input");
const searchIconPart = document.querySelector(".searchLogoSide");

// Search input focus on search bar click
searchbar.addEventListener("click", () => {
    searchInput.focus()
})

let lastCryptoValues = {
    BTC: [],
    ETH: [],
    BNB: [],
    USDT: [],
    XRP: [],
    ADA: [],
    SOL: [],
    DOGE: [],
    DOT: [],
    MATIC: [],
    LTC: [],
    BCH: [],
    LINK: [],
    XLM: [],
    VET: [],
    TRX: [],
    EOS: [],
    MKR: [],
    SHIB: [],
    AVAX: [],
    FTM: [],
    ALGO: [],
    LUNA: [],
    ZRX: [],
    UNI: [],
    SUSHI: [],
    AAVE: [],
    COMP: [],
    BAT: []
};


// Get cryptos infos part
const cryptosToFind = [
    "BTC", // Bitcoin
    "ETH", // Ethereum
    "BNB", // Binance Coin
    "USDT", // Tether
    "XRP", // Ripple
    "ADA", // Cardano
    "SOL", // Solana
    "DOGE", // Dogecoin
    "DOT", // Polkadot
    "MATIC", // Polygon
    "LTC", // Litecoin
    "BCH", // Bitcoin Cash
    "LINK", // Chainlink
    "XLM", // Stellar
    "VET", // VeChain
    "TRX", // TRON
    "EOS", // EOS.IO
    "MKR", // Maker
    "SHIB", // Shiba Inu
    "AVAX", // Avalanche
    "FTM", // Fantom
    "ALGO", // Algorand
    "LUNA", // Terra
    "ZRX", // 0x
    "UNI", // Uniswap
    "SUSHI", // SushiSwap
    "AAVE", // Aave
    "COMP", // Compound
    "BAT"  // Basic Attention Token
];

let prices = {
    BTC: 0,
    ETH: 0,
    BNB: 0,
    USDT: 0,
    XRP: 0,
    ADA: 0,
    SOL: 0,
    DOGE: 0,
    DOT: 0,
    MATIC: 0,
    LTC: 0,
    BCH: 0,
    LINK: 0,
    XLM: 0,
    VET: 0,
    TRX: 0,
    EOS: 0,
    MKR: 0,
    SHIB: 0,
    AVAX: 0,
    FTM: 0,
    ALGO: 0,
    LUNA: 0,
    ZRX: 0,
    UNI: 0,
    SUSHI: 0,
    AAVE: 0,
    COMP: 0,
    BAT: 0
};

const socketToApi = new WebSocket('wss://ws.coinapi.io/v1/');

socketToApi.onopen = () => {
    console.log("WebSocket opened")

    const message = {
        type: "hello",
        apikey: "81D78638-B2D6-4EAF-B3E8-12ECA628E6CE",
        heartbeat: false,
        subscribe_data_type: ["trade"],
        subscribe_filter_asset_id: cryptosToFind
    }
    socketToApi.send(JSON.stringify(message))
}

socketToApi.onmessage = (message) => {
    handleSocketMessage(message)
}

socketToApi.onclose = () => {
    console.log("Websocket closed")
}

function handleSocketMessage(message) {
    try {
        let datas = JSON.parse(message.data)
        let moneyPart = datas.symbol_id
        if (datas.type === "trade") {
            const crypto = cryptosToFind.find(code => moneyPart.includes(code)).toString()
            const lastCryptoValuesOfCrypto = lastCryptoValues[crypto]
            if (lastCryptoValuesOfCrypto.length >= 6) {
                lastCryptoValuesOfCrypto.shift()
            }
            lastCryptoValuesOfCrypto.push(datas.price)
        }
    }
    catch (e) {
        console.error("Error lors du parse des données")
    }
}

setInterval(() => {
    buildGraphForBtc()
}, 1000);
const ctx = document.getElementById("candlestickChart").getContext("2d")


function buildGraphForBtc() {
    const canvas = document.getElementById('candlestickChart');
    
    // Si un graphique existe déjà, on le met à jour
    if (window.myChart) {
        // Vérifier que les données existent
        if (!lastCryptoValues.BTC || lastCryptoValues.BTC.length === 0) {
            console.error('No data available for the chart.');
            return;
        }

        const labels = [];
        for (let i = 60; i >= 0; i -= 10) {
            labels.push(i.toString());
        }

        // Créer un tableau de données sous forme de chandeliers
        const chartData = lastCryptoValues.BTC.map((price, index) => {
            const openPrice = index > 0 ? lastCryptoValues.BTC[index - 1] : price;

            return {
                x: labels[index],
                o: openPrice,
                h: Math.max(openPrice, price),
                l: Math.min(openPrice, price),
                c: price
            };
        });

        // Mettre à jour les données du graphique existant
        window.myChart.data.labels = labels; // Met à jour les labels
        window.myChart.data.datasets[0].data = chartData; // Met à jour les données du dataset
        window.myChart.update(); // Applique les changements sans détruire le graphique

    } else {
        // Si aucun graphique n'existe, on en crée un nouveau
        const ctx = canvas.getContext('2d');
        const labels = [];
        for (let i = 60; i >= 0; i -= 10) {
            labels.push(i.toString());
        }

        // Créer un tableau de données sous forme de chandeliers
        const chartData = lastCryptoValues.BTC.map((price, index) => {
            const openPrice = index > 0 ? lastCryptoValues.BTC[index - 1] : price;

            return {
                x: labels[index],
                o: openPrice,
                h: Math.max(openPrice, price),
                l: Math.min(openPrice, price),
                c: price
            };
        });

        // Créer un nouveau graphique
        window.myChart = new Chart(ctx, {
            type: 'candlestick',
            data: {
                datasets: [{
                    label: 'BTC Candlestick',
                    data: chartData
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        labels: labels,
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
}
