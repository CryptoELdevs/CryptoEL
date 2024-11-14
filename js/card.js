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

getNameAndPrice("ETH")