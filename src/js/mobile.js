//SECTION MobileNavBar

const barMenuButton = document.getElementById("barMenuButton")
const barWrapper = document.getElementById("barWrapper")
const barBlurHelper = document.getElementById("barBlurHelper")
let bNavBar = 0

export function toggleNavBar() {
    bNavBar = 0
    fetchNavBar()
}

barMenuButton.addEventListener("click", () => {
    bNavBar = !bNavBar
    fetchNavBar()
})

function fetchNavBar() {
    if (bNavBar) {
        barMenuButton.classList.add("selected")
        barWrapper.classList.add("selected")
        barBlurHelper.classList.add("selected")
        document.documentElement.style.setProperty("--scrollToggle", "hidden")
    } else {
        barMenuButton.classList.remove("selected")
        barWrapper.classList.remove("selected")
        barBlurHelper.classList.remove("selected")
        document.documentElement.style.setProperty("--scrollToggle", "unset")
    }
}

//!SECTION