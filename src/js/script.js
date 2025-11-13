//SECTION - NavBarScript
import { dataBarList as barList } from "./data.js"

//consts
const styles = getComputedStyle(document.documentElement)
const barLogo = document.getElementById("barLogo")
const barWrapper = document.getElementById("barWrapper")
const barHeight = parseInt(styles.getPropertyValue("--NavBarHeight").trim().slice(0, -2))

let currentTab = ""

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

        currentTab = elm.innerHTML

        if (window.scrollY >= y && window.scrollY < y + rect.height) {
            elm.classList.add("selected")
        } else {
            elm.classList.remove("selected")
        }
    })
}
barSelectionObserver()

//!SECTION

//SECTION - HomeScript

import { dataHomeImgList as homeImgList } from "./data.js"

const arrowL = document.querySelector("#homeImgContainer > .l")
const arrowR = document.querySelector("#homeImgContainer > .r")
const homeImgWrapper = document.getElementById("homeImgWrapper")
let currentPic = 0;

function insertImg() {
    homeImgList.forEach((img, idx) => {
        const string = `url(${img})`
        console.log(string)
        document.querySelector(`#homeImgWrapper > .img.i${idx}`).style.backgroundImage = `url(${img})`
    })
}
insertImg()

arrowL.addEventListener("click", () => {
    currentPic = currentPic != 0 ? currentPic - 1 : 3;
    homeImgSlide()
})

arrowR.addEventListener("click", () => {
    currentPic = currentPic != 3 ? currentPic + 1 : 0;
    homeImgSlide()
})


function homeImgSlide() {
    document.querySelector("#homeImgWrapper > .img.selected").classList.remove("selected")
    document.querySelector(`#homeImgWrapper > .img.i${currentPic}`).classList.add("selected")
    homeImgWrapper.style.transform = `translateX(-${25*currentPic}%)`
}

//!SECTION