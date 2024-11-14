const cards = document.querySelector(".cards")

const cryptos = [
    "ETH",
    "BTC",
    "DOGE",
    "BNB",
    "ADA",    // Cardano
    "SOL",    // Solana
    "XRP",    // Ripple
    "DOT",    // Polkadot
    "LTC",    // Litecoin
    "AVAX",   // Avalanche
    "LINK",   // Chainlink
    "XLM",    // Stellar
    "UNI",    // Uniswap
    "ATOM",   // Cosmos
    "FIL",    // Filecoin
    "TRX",    // TRON
    "ETC",    // Ethereum Classic
    "VET",    // VeChain
    "ALGO",   // Algorand
    "MATIC",  // Polygon
    "ICP",    // Internet Computer
    "THETA",  // Theta
    "AAVE",   // Aave
    "XTZ",    // Tezos
    "FTT",    // FTX Token
    "EOS",    // EOS
    "SUSHI",  // SushiSwap
    "CAKE",   // PancakeSwap
    "ZEC",    // Zcash
    "ENJ",    // Enjin Coin
    "GRT"     // The Graph
];


async function getAPIKey() {
    let infos = await fetch("../config/config.json")
    infos = await infos.json()

    return infos.CoinAPI.APIKey
}

function createCard(crypto) {
    const card = document.createElement("div")
    card.classList.add("cryptoCard")
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

function buildAllCryptoCards() {
    cryptos.forEach(crypto => {
        buildCryptoCard(crypto)
    })
}

function buildCryptoCard(crypto) {
        const card = document.createElement("article")
        card.classList.add("cryptoCard")

        cards.appendChild(card)
        
        // Names div part
        const names = document.createElement("div")
        names.classList.add("names")

        card.appendChild(names)

        const surname = document.createElement("p")
        surname.classList.add("surname")
        surname.textContent = crypto

        names.appendChild(surname)

        const separator = document.createElement("div")
        separator.classList.add("separator")

        names.appendChild(separator)

        const name = document.createElement("p")
        name.classList.add("name")
        name.textContent = "Bitcoin"

        names.appendChild(name)

        // Blochain part
        const blockchain = document.createElement("p")
        blockchain.classList.add("blockchain")
        blockchain.textContent = "Bitcoin"

        card.appendChild(blockchain)

        // Percents part
        const percents = document.createElement("p")
        percents.classList.add("percents")
        percents.textContent = "+4.04%"

        card.appendChild(percents)

        // Price part
        const price = document.createElement("p")
        price.classList.add("price")
        price.textContent = "43825.43$"

        card.appendChild(price)

        // See more button part
        const seeMore = document.createElement("button")
        seeMore.textContent = "See more"

        card.appendChild(seeMore)
}

function search() {
    
}

buildAllCryptoCards()