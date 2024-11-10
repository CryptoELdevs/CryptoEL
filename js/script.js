// Initialize search bar HTML elements
const searchbar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBar input");
const searchIconPart = document.querySelector(".searchLogoSide");

// Search input focus on search bar click
searchbar.addEventListener("click", () => {
    searchInput.focus()
})

// Partie dédiée à la recherche via api
let result = null;

searchInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        try {
            const userInput = searchInput.value;
            const response = await fetch("http://localhost:8000/util/search.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `input=${encodeURIComponent(userInput)}`,
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            result = await response.text();
        } catch (e) {
            console.error("Error:", e);
        }
        console.log(result);
    }
});