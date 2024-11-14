const cards = document.querySelector(".cards")
const input = document.querySelector("input")

const cryptos = [
    { surname: "ETH", name: "Ethereum" },
    { surname: "BTC", name: "Bitcoin" },
    { surname: "DOG", name: "Dogecoin" },
    { surname: "BNB", name: "Binance Coin" },
    { surname: "ADA", name: "Cardano" },
    { surname: "SOL", name: "Solana" },
    { surname: "XRP", name: "XRP" },
    { surname: "DOT", name: "Polkadot" },
    { surname: "LTC", name: "Litecoin" },
    { surname: "AVA", name: "Avalanche" },
    { surname: "LIN", name: "Chainlink" },
    { surname: "XLM", name: "Stellar" },
    { surname: "UNI", name: "Uniswap" },
    { surname: "ATO", name: "Cosmos" },
    { surname: "FIL", name: "Filecoin" },
    { surname: "TRX", name: "Tron" },
    { surname: "ETC", name: "Ethereum Classic" },
    { surname: "VET", name: "VeChain" },
    { surname: "ALG", name: "Algorand" },
    { surname: "MAT", name: "Polygon" },
    { surname: "ICP", name: "Internet Computer" },
    { surname: "THE", name: "Theta Network" },
    { surname: "AAV", name: "Aave" },
    { surname: "XTZ", name: "Tezos" },
    { surname: "FTT", name: "FTX Token" },
    { surname: "EOS", name: "EOS" },
    { surname: "SUS", name: "SushiSwap" },
    { surname: "CAK", name: "PancakeSwap" },
    { surname: "ZEC", name: "Zcash" },
    { surname: "ENJ", name: "Enjin Coin" },
    { surname: "GRT", name: "The Graph" }
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

function buildAllCryptoCards() {
    cryptos.forEach(crypto => {
        buildCryptoCard(crypto)
    })
}

function buildCryptoCard(crypto) {
    const card = document.createElement("article")
    card.classList.add("cryptoCard")

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

function search() {
    const inputValue = input.value
    console.log(inputValue)
    const oldCryptos = document.querySelectorAll(".cards article") 

    const cryptosThatMatchInput = cryptos.filter(crypto => crypto.name.toLowerCase().includes(inputValue.toLowerCase()))

    oldCryptos.forEach(oldCrypto => oldCrypto.remove())

    cryptosThatMatchInput.forEach(cryptoThatMatchInput => buildCryptoCard(cryptoThatMatchInput))
}

buildAllCryptoCards()

input.addEventListener("input", () => {
        search()
})