const cards = document.querySelector(".cards")
const input = document.querySelector(".searchInput")
const cardsDiv = document.querySelector(".cards")

const cryptos = [
    { surname: "ETH", name: "Ethereum", sector: "Smart Contracts" },
    { surname: "BTC", name: "Bitcoin", sector: "Store of Value" },
    { surname: "DOG", name: "Dogecoin", sector: "Meme Coin" },
    { surname: "BNB", name: "Binance Coin", sector: "Exchange Token" },
    { surname: "ADA", name: "Cardano", sector: "Smart Contracts" },
    { surname: "SOL", name: "Solana", sector: "Smart Contracts" },
    { surname: "XRP", name: "XRP", sector: "Payments" },
    { surname: "DOT", name: "Polkadot", sector: "Interoperability" },
    { surname: "LTC", name: "Litecoin", sector: "Payments" },
    { surname: "AVA", name: "Avalanche", sector: "Smart Contracts" },
    { surname: "LIN", name: "Chainlink", sector: "Oracles" },
    { surname: "XLM", name: "Stellar", sector: "Payments" },
    { surname: "UNI", name: "Uniswap", sector: "Decentralized Exchange (DEX)" },
    { surname: "ATO", name: "Cosmos", sector: "Interoperability" },
    { surname: "FIL", name: "Filecoin", sector: "Decentralized Storage" },
    { surname: "TRX", name: "Tron", sector: "Smart Contracts" },
    { surname: "ETC", name: "Ethereum Classic", sector: "Smart Contracts" },
    { surname: "VET", name: "VeChain", sector: "Supply Chain" },
    { surname: "ALG", name: "Algorand", sector: "Smart Contracts" },
    { surname: "MAT", name: "Polygon", sector: "Layer 2 Scaling" },
    { surname: "ICP", name: "Internet Computer", sector: "Decentralized Computing" },
    { surname: "THE", name: "Theta Network", sector: "Streaming & Content" },
    { surname: "AAV", name: "Aave", sector: "DeFi Lending" },
    { surname: "XTZ", name: "Tezos", sector: "Smart Contracts" },
    { surname: "FTT", name: "FTX Token", sector: "Exchange Token" },
    { surname: "EOS", name: "EOS", sector: "Smart Contracts" },
    { surname: "SUS", name: "SushiSwap", sector: "Decentralized Exchange (DEX)" },
    { surname: "CAK", name: "PancakeSwap", sector: "Decentralized Exchange (DEX)" },
    { surname: "ZEC", name: "Zcash", sector: "Privacy" },
    { surname: "ENJ", name: "Enjin Coin", sector: "Gaming & NFTs" },
    { surname: "GRT", name: "The Graph", sector: "Indexing Protocol" }
];

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

/* Search part */

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