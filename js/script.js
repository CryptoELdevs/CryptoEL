const logo = document.querySelector(".logo")

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
let numberOfLines = 0;

const ctx = document.getElementById("candlestickChart").getContext("2d")

/**
 * Get the API key
 */
async function getAPIKey() {
    let infos = await fetch("../config/config.json")
    infos = await infos.json()

    return infos.CoinAPI.APIKey
}

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
                'X-CoinAPI-Key': await getAPIKey()
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

        window.cryptoGraph = new Chart(ctx, {
            type: 'candlestick',
            data: {
                datasets: [{
                    data: chartData
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        labels: labels,
                        title: {
                            display: true,
                            text: 'time that passed'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price in $'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        GraphAlreadyGenerated = true
    }
}

/**
 * Show a graph of a crypto that update himself
 * 
 * @param {string} time Time in which you would like to see the crypto
 * @param {string} crypto The crypto that you want to see
 */
async function showCrypto(time, crypto) {
    await askDatasFromApi(time, crypto)

    buildGraph(crypto)

    setInterval(async () => {
        const oldDatas = cryptoValuesByPeriod[crypto]
        await askDatasFromApi(time, crypto)
        if (cryptoValuesByPeriod[crypto] !== oldDatas)
            await buildGraph(crypto)
    }, 5000);
}


function changeLogo() {
    const width = window.innerWidth

    if (width < 1000)
        logo.setAttribute("src", "./assets/img/logoCarre.png")
    else
        logo.setAttribute("src", "./assets/img/logoComplet.png")
}

window.addEventListener("resize", changeLogo)

changeLogo()