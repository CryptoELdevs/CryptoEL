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
    let vwLeft = 0
    if (window.innerWidth <= 700)
        vwLeft = 100
    else
        vwLeft = 50

        menu.style.left = -vwLeft + "vw"
}

setLeft()

burgerButton.addEventListener("click", changeOpen)
window.addEventListener("resize", setLeft)