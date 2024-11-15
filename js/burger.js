const menu = document.querySelector("nav")
const burgerButton = document.querySelector("input[type=checkbox]")
let menuOpened = false

function changeOpen() {
    let vwToMove = 0
    if (window.innerWidth <= 700)
        vwToMove = 100
    else
        vwToMove = 50

    if (menuOpened)
        menu.style.left = -vwToMove + "vw"
    else
        menu.style.left = 0

    menuOpened = !menuOpened
}

function setLeft() {
    if (!menuOpened) {
        let vwLeft = 0
        let fontSize = ""
        if (window.innerWidth <= 700) {
            vwLeft = 100
            fontSize = "2rem"
        }
        else {
            vwLeft = 50
            fontSize = "1.5rem"
        }

        menu.style.left = -vwLeft + "vw"
        menu.querySelectorAll("ul li a").forEach(a => {
            a.style.fontSize = fontSize
        });
    }
}

setLeft()

burgerButton.addEventListener("click", changeOpen)
window.addEventListener("resize", setLeft)