//SECTION - NavBarScript
import { dataBarList as barList } from "./data.js"

import { toggleNavBar } from "./mobile.js"

//consts
const styles = getComputedStyle(document.documentElement)
const barLogo = document.getElementById("barLogo")
const barWrapper = document.getElementById("barWrapper")
let barHeight

let currentTab = ""

barLogo.addEventListener("click", () => {
    toggleNavBar()
    window.scrollTo(0, 0)
})

//NOTE - barList Creator
function barListCreator() {
    barHeight = parseInt(styles.getPropertyValue("--NavBarHeight").trim().slice(0, -2))
    barList.forEach((e, idx) => {
        const elm = document.createElement("div")
        elm.classList.add("barList")
        elm.id = `barList_${idx}`
        elm.innerHTML = e.name

        const rect = document.getElementById(e.id).getBoundingClientRect()
        const y = rect.top + window.scrollY - barHeight
        elm.addEventListener("click", () => {
            window.scrollTo(0, y)
            toggleNavBar()
        })

        barWrapper.appendChild(elm)
    })
}
window.addEventListener("DOMContentLoaded", () => {barListCreator(); barSelectionObserver()})

window.addEventListener("scroll", () => {
    barSelectionObserver()
})

//NOTE - barSelectionObserver
function barSelectionObserver() {
    barList.forEach((e, idx) => {
        const elm = document.getElementById(`barList_${idx}`)
        const rect = document.getElementById(e.id).getBoundingClientRect()
        const y = rect.top + window.scrollY - barHeight
        const normY = roundTo(y, 10)
        const normRect = roundTo(rect.height, 10)

        currentTab = elm.innerHTML

        if (window.scrollY >= normY && window.scrollY < normY + normRect) {
            elm.classList.add("selected")
        } else {
            elm.classList.remove("selected")
        }
    })
}

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

//SECTION - Utiliy

function roundTo(n, dec) {
    return Math.round(n/dec)*dec
}

//!SECTION

//SECTION - ModeSelector

let MODE = 1

const modeSelector = document.getElementById("modeSelector")
const modeBall = document.getElementById("modeBall")

modeBall.addEventListener("click", () => {
    MODE = !MODE;
    fetchMode()
})

function fetchMode() {
    if (MODE) {
        modeBall.classList.add("selected")
        modeSelector.classList.add("selected")

        document.documentElement.style.setProperty("--CLcontrast", "#000")
        document.documentElement.style.setProperty("--CLcolorMain", styles.getPropertyValue("--CLcolor2").trim())
    } else {
        modeBall.classList.remove("selected")
        modeSelector.classList.remove("selected")

        document.documentElement.style.setProperty("--CLcontrast", "#fff")
        document.documentElement.style.setProperty("--CLcolorMain", styles.getPropertyValue("--CLcolor1").trim())
    }
}

//!SECTION