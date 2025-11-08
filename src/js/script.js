//SECTION - NavBarScript
import { dataBarList as barList } from "./data.js"

//consts
const styles = getComputedStyle(document.documentElement)
const barLogo = document.getElementById("barLogo")
const barWrapper = document.getElementById("barWrapper")
const barHeight = parseInt(styles.getPropertyValue("--NavBarHeight").trim().slice(0, -2))

barLogo.addEventListener("click", () => {
    window.scrollTo(0, 0)
})

//NOTE - barList Creator
barList.forEach((e, idx) => {
    const elm = document.createElement("div")
    elm.classList.add("barList")
    elm.id = `barList_${idx}`
    elm.innerHTML = e.name

    const rect = document.getElementById(e.id).getBoundingClientRect()
    const y = rect.top + window.scrollY - barHeight
    elm.addEventListener("click", () => {
        window.scrollTo(0, y)
    })

    barWrapper.appendChild(elm)
})

window.addEventListener("scroll", () => {
    barSelectionObserver()
})

//NOTE - barSelectionObserver
function barSelectionObserver() {
    barList.forEach((e, idx) => {
        const elm = document.getElementById(`barList_${idx}`)
        const rect = document.getElementById(e.id).getBoundingClientRect()
        const y = rect.top + window.scrollY - barHeight

        if (window.scrollY >= y && window.scrollY < y + rect.height) {
            elm.classList.add("selected")
        } else {
            elm.classList.remove("selected")
        }
    })
}
barSelectionObserver()

//!SECTION