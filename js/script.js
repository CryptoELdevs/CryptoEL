const logo = document.querySelector(".logo")

const sectors = [
    "Smart Contracts",
    "Store of Value",
    "Meme Coin",
    "Exchange & DeFi",
    "Payments",
    "Storage & Computing",
    "Oracles",
    "Layer 2 Scaling",
    "DeFi Lending",
    "Advertising",
    "Blockchain Infrastructure",
    "Interoperability",
    "Artificial Intelligence"
];

let cryptos = [
    { surname: "ETH", name: "Ethereum", sector: sectors[0] },
    { surname: "BTC", name: "Bitcoin", sector: sectors[1] },
    { surname: "DOG", name: "Dogecoin", sector: sectors[2] },
    { surname: "BNB", name: "Binance Coin", sector: sectors[3] },
    { surname: "ADA", name: "Cardano", sector: sectors[0] },
    { surname: "SOL", name: "Solana", sector: sectors[0] },
    { surname: "XRP", name: "XRP", sector: sectors[4] },
    { surname: "DOT", name: "Polkadot", sector: sectors[5] },
    { surname: "LTC", name: "Litecoin", sector: sectors[1] },
    { surname: "AVA", name: "Avalanche", sector: sectors[0] },
    { surname: "LIN", name: "Chainlink", sector: sectors[6] },
    { surname: "XLM", name: "Stellar", sector: sectors[4] },
    { surname: "UNI", name: "Uniswap", sector: sectors[3] },
    { surname: "ATO", name: "Cosmos", sector: sectors[5] },
    { surname: "FIL", name: "Filecoin", sector: sectors[5] },
    { surname: "TRX", name: "Tron", sector: sectors[0] },
    { surname: "ETC", name: "Ethereum Classic", sector: sectors[0] },
    { surname: "VET", name: "VeChain", sector: sectors[5] },
    { surname: "ALG", name: "Algorand", sector: sectors[0] },
    { surname: "MAT", name: "Polygon", sector: sectors[7] },
    { surname: "ICP", name: "Internet Computer", sector: sectors[5] },
    { surname: "THE", name: "Theta Network", sector: sectors[5] },
    { surname: "AAV", name: "Aave", sector: sectors[8] },
    { surname: "XTZ", name: "Tezos", sector: sectors[0] },
    { surname: "FTT", name: "FTX Token", sector: sectors[3] },
    { surname: "EOS", name: "EOS", sector: sectors[0] },
    { surname: "SUS", name: "SushiSwap", sector: sectors[3] },
    { surname: "CAK", name: "PancakeSwap", sector: sectors[3] },
    { surname: "ZEC", name: "Zcash", sector: sectors[9] },
    { surname: "ENJ", name: "Enjin Coin", sector: sectors[9] },
    { surname: "GRT", name: "The Graph", sector: sectors[10] },
    { surname: "LIN", name: "Chainlink", sector: sectors[6] },
    { surname: "MAT", name: "Polygon", sector: sectors[7] },
    { surname: "SHI", name: "Shiba Inu", sector: sectors[2] },
    { surname: "AAV", name: "Aave", sector: sectors[8] },
    { surname: "XMR", name: "Monero", sector: sectors[3] },
    { surname: "ZRX", name: "0x", sector: sectors[3] },
    { surname: "BAT", name: "Basic Attention Token", sector: sectors[9] },
    { surname: "STP", name: "Standard Tokenization Protocol", sector: sectors[10] },
    { surname: "YFI", name: "Yearn.finance", sector: sectors[8] },
    { surname: "KSM", name: "Kusama", sector: sectors[11] },
    { surname: "FET", name: "Fetch.ai", sector: sectors[12] }
];


const cards = document.querySelector(".cards")
const input = document.querySelector(".searchInput")
const cardsDiv = document.querySelector(".cards")

//------------------------------------------SEARCH PART---------------------------------------->

async function getAPIKey() {
    let infos = await fetch("../config/config.json")
    infos = await infos.json()

    return infos.CoinAPI.APIKey
}

async function getNameAndPrice(crypto) {
    const apiKey = await getAPIKey()
    const url = `https://rest.coinapi.io/v1/exchangerate/${crypto}/USD`
    console.log(apiKey)
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'X-CoinAPI-Key': apiKey
        }
    })
    console.log(await response.json())
}

/**
 * Show all the crypto cards that need to be at start
 */
function buildAllCryptoCards() {
    cryptos.forEach(crypto => {
        buildCryptoCard(crypto)
    })
}

/**
 * Build one crypto cards defined by the crypto it shows
 * 
 * @param {string} crypto The crypto you want to build the card
 */
function buildCryptoCard(crypto) {
    const card = document.createElement("article")
    card.classList.add("cryptoCard")
    card.classList.add(crypto.sector.replace(/ /g, "-"))

    cards.appendChild(card)

    // Head div part
    const head = document.createElement("div")
    head.classList.add("head")
    card.appendChild(head)

    // Names div part
    const names = document.createElement("div")
    names.classList.add("names")

    head.appendChild(names)

    const firstPart = document.createElement("div")
    firstPart.classList.add("firstPart")

    names.appendChild(firstPart)

    const surname = document.createElement("p")
    surname.classList.add("surname")
    surname.textContent = crypto.surname

    firstPart.appendChild(surname)

    const separator = document.createElement("div")
    separator.classList.add("separator")

    firstPart.appendChild(separator)

    const name = document.createElement("p")
    name.classList.add("name")
    name.textContent = crypto.name

    names.appendChild(name)

    // Blochain part
    const blockchain = document.createElement("p")
    blockchain.classList.add("blockchain")
    blockchain.textContent = "Bitcoin"

    head.appendChild(blockchain)

    // Percents part
    const percents = document.createElement("p")
    percents.classList.add("percents")
    percents.textContent = "+4.04%"

    head.appendChild(percents)

    // Price part
    const price = document.createElement("p")
    price.classList.add("price")
    price.textContent = "43825.43$"

    head.appendChild(price)

    // See more button part
    const seeMore = document.createElement("button")
    seeMore.textContent = "See more"

    head.appendChild(seeMore)
}

/* Get the block element */
const blocks = document.querySelector(".blocks")

/**
 * Show the blocks section or not in function of the input in parameter
 * 
 * @param {string} inputValue The input of the user
 */
function showBlocksOrNot(inputValue) {
    if (!inputValue) {
        blocks.style.height = "50vh"
        blocks.style.minHeight = "30rem"
        blocks.style.pointerEvents = "auto"
        blocks.style.opacity = "1"
        blocks.style.paddingTop = "3rem"
        cardsDiv.style.marginTop = "2rem"
    }
    else {
        blocks.style.height = "0"
        blocks.style.minHeight = "0"
        blocks.style.paddingTop = "0"
        blocks.style.pointerEvents = "none"
        blocks.style.opacity = "0"
        cardsDiv.style.marginTop = "0"
    }
}

/**
 * Show cards that marches the user input and show or not blocks if the user searched
 */
function search() {
    /* Initialisation */
    const inputValue = input.value
    const oldCryptos = document.querySelectorAll(".cards article")

    /* If the user search, remove the blocks else show them */
    showBlocksOrNot(inputValue)

    /* Get all the cryptos that matches the input and replace old by them */
    const cryptosThatMatchInput = cryptos.filter(crypto => crypto.name.toLowerCase().includes(inputValue.toLowerCase()))

    oldCryptos.forEach(oldCrypto => oldCrypto.remove())

    if (cryptosThatMatchInput.length > 0) {
        // rebuild the h1 if he doesn't exists
        const oldh1 = cardsDiv.querySelector("h1")
        if (!oldh1) {
            const h1 = document.createElement("h1")
            h1.textContent = "All coins"

            cardsDiv.appendChild(h1)
        }

        cardsDiv.textContent = ""
        cryptosThatMatchInput.forEach(cryptoThatMatchInput => buildCryptoCard(cryptoThatMatchInput))
    }
    else
        cardsDiv.textContent = "No coin found"
}

buildAllCryptoCards()

input.addEventListener("input", () => {
    search()
})

// Initialize search bar HTML elements
const searchbar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBar input");

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
    }, 30000);
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
showCrypto("h", "ETH")

//------------------------------------------FILTERS PART---------------------------------------->
const sector = document.getElementById("sector")
const sectorSummary = document.getElementById("sectorSummary")

let filterSectorOpened = false
let sectorFilters = []

// Build all the sectors p
sectors.forEach(sectorName => {
    const newSector = document.createElement("p")
    newSector.textContent = sectorName

    sector.appendChild(newSector)
})

const sectorFilter = document.querySelectorAll("#sector p")

/**
 * Toggle the sector filter
 */
function toggleSectorFilter() {
    filterSectorOpened = !filterSectorOpened

    if (!filterSectorOpened) {
        sectorSummary.querySelector("img").src = "/assets/img/rightArrow.png"
    }
    else {
        sectorSummary.querySelector("img").src = "/assets/img/downArrow.png"
    }

}

sectorFilter.forEach(oneSectorFilter => {
    oneSectorFilter.addEventListener("click", (e) => {
        const oldCryptos = document.querySelectorAll(".cards article")
        const sector = e.target
        const textContent = sector.textContent

        if (!sectorFilters.includes(textContent) && sectors.includes(textContent)) {
            sectorFilters.push(textContent)
            sector.style.color = "black"
        }
        else if (sectorFilters.includes(textContent) && sectors.includes(textContent)) {
            const index = sectorFilters.indexOf(textContent)
            sectorFilters.splice(index, 1)
            sector.style.color = "#999"
        }

        if (sectorFilters.length > 0) {
            oldCryptos.forEach(oldCrypto => oldCrypto.remove())

            const cryptosThatHaveSector = cryptos.filter(crypto => sectorFilters.includes(crypto.sector))
            cryptosThatHaveSector.forEach(cryptoThatHaveSector => buildCryptoCard(cryptoThatHaveSector))
        }
        else {
            buildAllCryptoCards()
        }

        if (searchInput.value) {
            searchInput.value = ""
            search()
        }
    })
})

sectorSummary.addEventListener("click", toggleSectorFilter)