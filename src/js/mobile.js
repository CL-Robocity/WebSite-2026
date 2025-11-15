//SECTION MobileNavBar

const barMenuButton = document.getElementById("barMenuButton")
const barWrapper = document.getElementById("barWrapper")
let bNavBar = 0

barMenuButton.addEventListener("click", () => {
    bNavBar = !bNavBar
    fetchNavBar()
})

function fetchNavBar() {
    if (bNavBar) {
        barMenuButton.classList.add("selected")
        barWrapper.classList.add("selected")
    } else {
        barMenuButton.classList.remove("selected")
        barWrapper.classList.remove("selected")
    }
}

//!SECTION