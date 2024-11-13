

// Initialize search bar HTML elements
const searchbar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBar input");
const searchIconPart = document.querySelector(".searchLogoSide");

// Search input focus on search bar click
searchbar.addEventListener("click", () => {
    searchInput.focus()
})

//------------------------------------------CRYPTO GRAPH PART---------------------------------------->

let cryptoValuesByPeriod = {};

const ctx = document.getElementById("candlestickChart").getContext("2d")

let numberOfLines = 0;

/**
 * Ask the datas about one money from an api and put it in an array
 * 
 * @param {string} time Time in which you would like to see the crypto
 * @param {string} crypto The crypto that you want to see
 */
async function askDatasFromApi(time, crypto) {
    try {
        let dateStart = new Date()
        const dateEnd = (new Date()).toISOString()
        switch (time) {
            case "h":
                dateStart.setHours(dateStart.getHours() - 1);
                period = "1MIN"
                break;
            case "d":
                dateStart.setDate(dateStart.getDate() - 1);
                period = "1HRS"
                break;
            case "m":
                dateStart.setMonth(dateStart.getMonth() - 1);
                period = "1DAY";
                break;
            case "y":
                dateStart.setFullYear(dateStart.getFullYear() - 1)
                period = "7DAY";
                break
        }

        dateStart = dateStart.toISOString()

        const url = `https://rest.coinapi.io/v1/exchangerate/${crypto}/USD/history?period_id=${period}&time_start=${dateStart}&time_end=${dateEnd}`;

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

        cryptoValuesByPeriod[crypto] = infosJson
    }
    catch (e) {
        console.error(e)
    }
}

/**
 * Build a graph for a crypto
 * 
 * @param {string} crypto The crypto that you want to see
 */
function buildGraph(crypto) {

    let labels = []
    const numberOfLabels = cryptoValuesByPeriod[crypto].length;
    for (let i = 0; i < numberOfLabels; i++)
        labels.push(i)

    const canvas = document.getElementById('candlestickChart');
    const cryptoInfos = cryptoValuesByPeriod[crypto]

    let chartData = []
    for (let i = 0; i < numberOfLabels; i++) {
        chartData.push({
            // Construction d'une bougie
            x: labels[i],
            o: cryptoInfos[i].rate_open,
            h: cryptoInfos[i].rate_high,
            l: cryptoInfos[i].rate_low,
            c: cryptoInfos[i].rate_close
        });
    }

    if (window.cryptoGraph) {

        // Mettre à jour les données du graphique existant
        window.cryptoGraph.data.datasets[0].labels = numberOfLabels;
        window.cryptoGraph.data.datasets[0].data = chartData;
        window.cryptoGraph.update();

    } else {
        // Si aucun graphique n'existe, on en crée un nouveau
        const ctx = canvas.getContext('2d');
        console.log(labels)

        window.cryptoGraph = new Chart(ctx, {
            type: 'candlestick',
            data: {
                datasets: [{
                    label: ` ${crypto} line`,
                    data: chartData
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        labels: labels
                    },
                    y: {
                        beginAtZero: false
                    }
                },
                animation: {
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
async function showCrypto(time, crypto) {
    let interval = 0;
    switch (time) {
        case "h":
            interval = 60 * 1000;
            break;
        case "d":
            interval = 86400 * 1000;
            break;
        case "m":
            interval = 2592 * 1000 * 1000;
            break;
        case "y":
            interval = 31536 * 1000 * 1000;
            break;
    }
    await askDatasFromApi(time, crypto)

    buildGraph(crypto)

    setInterval(() => {
        askDatasFromApi(time, crypto)
    }, interval);

    setInterval(() => {
        buildGraph(crypto)
    }, interval);
}

showCrypto("h", "ETH")