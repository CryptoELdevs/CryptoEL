

// Initialize search bar HTML elements
const searchbar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBar input");
const searchIconPart = document.querySelector(".searchLogoSide");

// Search input focus on search bar click
searchbar.addEventListener("click", () => {
    searchInput.focus()
})

//------------------------------------------CRYPTO GRAPH PART---------------------------------------->

let cryptoValuesByPeriod = {
    byHour: {
        BTC: { min: [], max: [], start: [], end: [] },
        ETH: { min: [], max: [], start: [], end: [] },
        BNB: { min: [], max: [], start: [], end: [] },
        USDT: { min: [], max: [], start: [], end: [] },
        XRP: { min: [], max: [], start: [], end: [] },
        ADA: { min: [], max: [], start: [], end: [] },
        SOL: { min: [], max: [], start: [], end: [] },
        DOGE: { min: [], max: [], start: [], end: [] },
        DOT: { min: [], max: [], start: [], end: [] },
        MATIC: { min: [], max: [], start: [], end: [] },
        LTC: { min: [], max: [], start: [], end: [] },
        BCH: { min: [], max: [], start: [], end: [] },
        LINK: { min: [], max: [], start: [], end: [] },
        XLM: { min: [], max: [], start: [], end: [] },
        VET: { min: [], max: [], start: [], end: [] },
        TRX: { min: [], max: [], start: [], end: [] },
        EOS: { min: [], max: [], start: [], end: [] },
        MKR: { min: [], max: [], start: [], end: [] },
        SHIB: { min: [], max: [], start: [], end: [] },
        AVAX: { min: [], max: [], start: [], end: [] },
        FTM: { min: [], max: [], start: [], end: [] },
        ALGO: { min: [], max: [], start: [], end: [] },
        LUNA: { min: [], max: [], start: [], end: [] },
        ZRX: { min: [], max: [], start: [], end: [] },
        UNI: { min: [], max: [], start: [], end: [] },
        SUSHI: { min: [], max: [], start: [], end: [] },
        AAVE: { min: [], max: [], start: [], end: [] },
        COMP: { min: [], max: [], start: [], end: [] },
        BAT: { min: [], max: [], start: [], end: [] }
    },
    byDay: {
        BTC: { min: [], max: [], start: [], end: [] },
        ETH: { min: [], max: [], start: [], end: [] },
        BNB: { min: [], max: [], start: [], end: [] },
        USDT: { min: [], max: [], start: [], end: [] },
        XRP: { min: [], max: [], start: [], end: [] },
        ADA: { min: [], max: [], start: [], end: [] },
        SOL: { min: [], max: [], start: [], end: [] },
        DOGE: { min: [], max: [], start: [], end: [] },
        DOT: { min: [], max: [], start: [], end: [] },
        MATIC: { min: [], max: [], start: [], end: [] },
        LTC: { min: [], max: [], start: [], end: [] },
        BCH: { min: [], max: [], start: [], end: [] },
        LINK: { min: [], max: [], start: [], end: [] },
        XLM: { min: [], max: [], start: [], end: [] },
        VET: { min: [], max: [], start: [], end: [] },
        TRX: { min: [], max: [], start: [], end: [] },
        EOS: { min: [], max: [], start: [], end: [] },
        MKR: { min: [], max: [], start: [], end: [] },
        SHIB: { min: [], max: [], start: [], end: [] },
        AVAX: { min: [], max: [], start: [], end: [] },
        FTM: { min: [], max: [], start: [], end: [] },
        ALGO: { min: [], max: [], start: [], end: [] },
        LUNA: { min: [], max: [], start: [], end: [] },
        ZRX: { min: [], max: [], start: [], end: [] },
        UNI: { min: [], max: [], start: [], end: [] },
        SUSHI: { min: [], max: [], start: [], end: [] },
        AAVE: { min: [], max: [], start: [], end: [] },
        COMP: { min: [], max: [], start: [], end: [] },
        BAT: { min: [], max: [], start: [], end: [] }
    },
    byMonth: {
        BTC: { min: [], max: [], start: [], end: [] },
        ETH: { min: [], max: [], start: [], end: [] },
        BNB: { min: [], max: [], start: [], end: [] },
        USDT: { min: [], max: [], start: [], end: [] },
        XRP: { min: [], max: [], start: [], end: [] },
        ADA: { min: [], max: [], start: [], end: [] },
        SOL: { min: [], max: [], start: [], end: [] },
        DOGE: { min: [], max: [], start: [], end: [] },
        DOT: { min: [], max: [], start: [], end: [] },
        MATIC: { min: [], max: [], start: [], end: [] },
        LTC: { min: [], max: [], start: [], end: [] },
        BCH: { min: [], max: [], start: [], end: [] },
        LINK: { min: [], max: [], start: [], end: [] },
        XLM: { min: [], max: [], start: [], end: [] },
        VET: { min: [], max: [], start: [], end: [] },
        TRX: { min: [], max: [], start: [], end: [] },
        EOS: { min: [], max: [], start: [], end: [] },
        MKR: { min: [], max: [], start: [], end: [] },
        SHIB: { min: [], max: [], start: [], end: [] },
        AVAX: { min: [], max: [], start: [], end: [] },
        FTM: { min: [], max: [], start: [], end: [] },
        ALGO: { min: [], max: [], start: [], end: [] },
        LUNA: { min: [], max: [], start: [], end: [] },
        ZRX: { min: [], max: [], start: [], end: [] },
        UNI: { min: [], max: [], start: [], end: [] },
        SUSHI: { min: [], max: [], start: [], end: [] },
        AAVE: { min: [], max: [], start: [], end: [] },
        COMP: { min: [], max: [], start: [], end: [] },
        BAT: { min: [], max: [], start: [], end: [] }
    },
    byYear: {
        BTC: { min: [], max: [], start: [], end: [] },
        ETH: { min: [], max: [], start: [], end: [] },
        BNB: { min: [], max: [], start: [], end: [] },
        USDT: { min: [], max: [], start: [], end: [] },
        XRP: { min: [], max: [], start: [], end: [] },
        ADA: { min: [], max: [], start: [], end: [] },
        SOL: { min: [], max: [], start: [], end: [] },
        DOGE: { min: [], max: [], start: [], end: [] },
        DOT: { min: [], max: [], start: [], end: [] },
        MATIC: { min: [], max: [], start: [], end: [] },
        LTC: { min: [], max: [], start: [], end: [] },
        BCH: { min: [], max: [], start: [], end: [] },
        LINK: { min: [], max: [], start: [], end: [] },
        XLM: { min: [], max: [], start: [], end: [] },
        VET: { min: [], max: [], start: [], end: [] },
        TRX: { min: [], max: [], start: [], end: [] },
        EOS: { min: [], max: [], start: [], end: [] },
        MKR: { min: [], max: [], start: [], end: [] },
        SHIB: { min: [], max: [], start: [], end: [] },
        AVAX: { min: [], max: [], start: [], end: [] },
        FTM: { min: [], max: [], start: [], end: [] },
        ALGO: { min: [], max: [], start: [], end: [] },
        LUNA: { min: [], max: [], start: [], end: [] },
        ZRX: { min: [], max: [], start: [], end: [] },
        UNI: { min: [], max: [], start: [], end: [] },
        SUSHI: { min: [], max: [], start: [], end: [] },
        AAVE: { min: [], max: [], start: [], end: [] },
        COMP: { min: [], max: [], start: [], end: [] },
        BAT: { min: [], max: [], start: [], end: [] }
    }
};

const ctx = document.getElementById("candlestickChart").getContext("2d")

let numberOfLInes = 0;

/**
 * Ask the datas about one money from an api and put it in an array
 * 
 * @param {string} time Time in which you would like to see the crypto
 * @param {string} money The crypto that you want to see
 */
async function askDatasFromApi(time, money) {
    try {
        let dateStart = new Date()
        const dateEnd = (new Date()).toISOString()
        let byTimeArray = [];
        switch (time) {
            case "h":
                dateStart.setHours(dateStart.getHours() - 1);
                period = "1MIN"
                byTimeArray = cryptoValuesByPeriod.byHour
                break;
            case "d":
                dateStart.setDate(dateStart.getDate() - 1);
                period = "1HRS"
                byTimeArray = cryptoValuesByPeriod.byDay
                break;
            case "m":
                dateStart.setMonth(dateStart.getMonth() - 1);
                period = "1DAY";
                byTimeArray = cryptoValuesByPeriod.byMonth
                break;
            case "y":
                dateStart.setFullYear(dateStart.getFullYear() - 1)
                period = "7DAY";
                byTimeArray = cryptoValuesByPeriod.byYear
                break
        }

        dateStart = dateStart.toISOString()

        const url = `https://rest.coinapi.io/v1/exchangerate/${money}/USD/history?period_id=${period}&time_start=${dateStart}&time_end=${dateEnd}`;

        const ohlcv = await fetch(url, {
            method: "GET",
            headers: {
                'X-CoinAPI-Key': "81D78638-B2D6-4EAF-B3E8-12ECA628E6CE"
            }
        })

        if (!ohlcv.ok) {
            throw new error(`Erreur lors du fetch (${ohlcv.status})`)
        }

        let infosJson = await ohlcv.json()

        const crypto = byTimeArray[money];

        crypto.min = []
        crypto.max = []
        crypto.start = []
        crypto.end = []

        infosJson.forEach(info => {
            crypto.min.push(info.rate_low)
            crypto.max.push(info.rate_high)
            crypto.start.push(info.rate_open)
            crypto.end.push(info.rate_close)
        })
    }
    catch (e) {
        console.error(e)
    }
}

/**
 * Build a graph for a crypto
 * 
 * @param {string} time Time in which you would like to see the crypto
 * @param {string} cryptoToShow The crypto that you want to see
 */
function buildGraph(time, cryptoToShow) {
    let byTime = []
    let labels = []
    switch (time) {
        case "h":
            byTime = cryptoValuesByPeriod.byHour
            break;
        case "d":
            byTime = cryptoValuesByPeriod.byDay
            break;
        case "m":
            byTime = cryptoValuesByPeriod.byMonth
            break;
        case "y":
            byTime = cryptoValuesByPeriod.byYear
            break;
    }
    const canvas = document.getElementById('candlestickChart');
    const crypto = byTime[cryptoToShow]
    for (let i = 0; i < crypto.min.length; i++)
        labels.push(i)

    if (window.myChart) {
        // Créer un tableau de données sous forme de chandeliers 
        let chartData = []
        for (let i = 0; i < labels.length; i++) {
            chartData.push({
                x: labels[i],
                o: crypto.start[i],
                h: crypto.max[i],
                l: crypto.min[i],
                c: crypto.end[i]
            });
        }

        // Mettre à jour les données du graphique existant
        window.myChart.data.datasets[0].data = chartData; // Met à jour les données du dataset
        window.myChart.update(); // Applique les changements sans détruire le graphique

    } else {
        // Si aucun graphique n'existe, on en crée un nouveau
        const ctx = canvas.getContext('2d');

        // Créer un tableau de données sous forme de chandeliers
        let chartData = []
        const crypto = byTime[cryptoToShow]
        for (let i = 0; i < labels.length; i++) {
            chartData.push({
                x: labels[i],
                o: crypto.start[i],
                h: crypto.max[i],
                l: crypto.min[i],
                c: crypto.end[i]
            });
        }

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

/**
 * Show a graph of a crypto that update himself
 * 
 * @param {string} time Time in which you would like to see the crypto
 * @param {string} crypto The crypto that you want to see
 */
function showCrypto(time, crypto) {
    askDatasFromApi(time, crypto)

    setTimeout(() => {
        buildGraph(time, crypto)
    }, 1000);

    setInterval(() => {
        askDatasFromApi(time, crypto)
    }, 60000);

    setInterval(() => {
        buildGraph(time, crypto)
    }, 60000);
}

showCrypto("h", "ETH")