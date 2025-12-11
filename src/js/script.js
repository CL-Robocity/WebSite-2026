//SECTION - NavBarScript
import { dataBarList as barList } from "./data.js"

import { toggleNavBar } from "./mobile.js"

//consts
const styles = getComputedStyle(document.documentElement)
const barLogo = document.getElementById("barLogo")
const barWrapper = document.getElementById("barWrapper")

let barHeight = document.getElementById("barBox").clientHeight
window.addEventListener("resize", () => {barHeight = document.getElementById("barBox").clientHeight})

let currentTab = ""

barLogo.addEventListener("click", () => {
    toggleNavBar()
    window.scrollTo(0, 0)
})

//NOTE - barList Creator
function barListCreator() {
    barList.forEach((e, idx) => {
        const elm = document.createElement("div")
        elm.classList.add("barList")
        elm.id = `barList_${idx}`
        elm.innerHTML = e.name
        
        elm.addEventListener("click", () => {
            scrollToElement(e.id)
            toggleNavBar()
        })

        barWrapper.appendChild(elm)
    })
}
window.addEventListener("DOMContentLoaded", () => {barListCreator(); barSelectionObserver()})

function scrollToElement(id) {
    const rect = document.getElementById(id).getBoundingClientRect()
    const y = rect.top + window.scrollY - barHeight
    console.log(barHeight)
    window.scrollTo(0, y)
}

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

//SECTION - ModeSelector

//consts
const modeSelector = document.getElementById("modeSelector")
const modeBall = document.getElementById("modeBall")

const params = new URLSearchParams(window.location.search)
let MODE

//Params INIT ( PageStart )
if (window.location.href.indexOf("?m=") == -1) {
    params.set("m", "ftc")
    history.pushState(null, '', '?m=ftc')
    MODE = 1
} else {
    let m = params.get("m")
    
    if (m == "ftc") {
        MODE = 1
    } else {
        MODE = 0
    }
}
fetchMode()

//Click Handler
modeBall.addEventListener("click", () => {
    MODE = !MODE;

    //Clear Interval
    clearInterval(EventInterval)

    //Url Handler
    const url = new URL(window.location)
    if (MODE) {
        params.set("m", "ftc")
        url.searchParams.set("m", "ftc")
        history.replaceState(null, '', url.toString())
    } else {
        params.set("m", "fll")
        url.searchParams.set("m", "fll")
        history.replaceState(null, '', url.toString())
    }
    modeSelectorStyler()

    document.getElementById("loader").style.transform = ""
    setTimeout(() => window.location.reload(), 400)
})

//NOTE - FetchMode Function
function fetchMode() {
    const favicon = document.querySelector("link[rel~='icon']")

    insertImg(MODE)
    modeSelectorStyler()
    if (MODE) {
        document.documentElement.style.setProperty("--CLcontrast", "#000")
        document.documentElement.style.setProperty("--CLcolorMain", styles.getPropertyValue("--CLcolor2").trim())

        favicon.href = "./src/assets/svg/CLquadratoFTC.svg"
    } else {
        document.documentElement.style.setProperty("--CLcontrast", "#fff")
        document.documentElement.style.setProperty("--CLcolorMain", styles.getPropertyValue("--CLcolor1").trim())

        favicon.href = "./src/assets/svg/CLquadratoFLL.svg"
    }
}

//NOTE - modeSelectorStyler
function modeSelectorStyler() {
    if (MODE) {
        modeBall.classList.add("selected")
        modeSelector.classList.add("selected")
        modeSelector.style.boxShadow = "0px 8px 32px 0 #0000005e, inset 0 4px 5px color-mix(in srgb, var(--CLcolor2) 60%, transparent), inset 0 -4px 5px color-mix(in srgb, var(--CLcolor2) 60%, transparent)"
    } else {
        modeBall.classList.remove("selected")
        modeSelector.classList.remove("selected")
        modeSelector.style.boxShadow = "0px 8px 32px 0 #0000005e, inset 0 4px 5px color-mix(in srgb, var(--CLcolor1) 60%, transparent), inset 0 -4px 5px color-mix(in srgb, var(--CLcolor1) 60%, transparent)"
    }
}

//!SECTION

//SECTION - HomeScript

import { dataHomeImgList as homeImgList } from "./data.js"

const arrowL = document.querySelector("#homeImgContainer > .l")
const arrowR = document.querySelector("#homeImgContainer > .r")
const homeImgWrapper = document.getElementById("homeImgWrapper")
let currentPic = 0;

function insertImg(m) {
    for (let i = 0; i < 4; i++){
        const str = `url(${homeImgList[i+4*m]})`
        document.querySelector(`#homeImgWrapper > .img.i${i}`).style.backgroundImage = str
    }
}

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

document.querySelector(".team.button").addEventListener("click", () => {scrollToElement("teamBox")})
document.querySelector(".sponsors.button").addEventListener("click", () => {scrollToElement("sponsorBox")})

//NOTE - EventTimer
import { dataNextEvent, dataTimerSVG } from "./data.js"
const homeEventTitle = document.getElementById("homeEventTitle")
const homeEventSubtitle = document.getElementById("homeEventSubtitle")
const homeEventUI = document.getElementById("homeEventUI")

const currentEvent = dataNextEvent[MODE].filter(a => a.date > Date.now())[0]

let EventInterval

const labelsTXT = ["Giorni", "Ore", "Minuti", "Secondi"]
function EventTimerCreator() {
    homeEventTitle.innerHTML = currentEvent.n
    const formattedDate = currentEvent.date.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric"}).replace(/(\d+\s)(\p{L})/u, (_, g1, g2) => g1 + g2.toUpperCase());
    homeEventSubtitle.innerHTML = `${formattedDate} ● ${currentEvent.l}`

    dataNextEvent[2].forEach((s, idx) => {
        const elm = document.createElement("div")
        elm.classList.add("eventTimer")
        homeEventUI.appendChild(elm)
        elm.innerHTML = dataTimerSVG
        elm.querySelector(`.eventTimerStroke`).classList.add(s)

        const labels = document.createElement("div")
        labels.classList.add("eventTimerLabels")
        labels.classList.add(s)
        
        const n = document.createElement("div")
        n.classList.add("n")

        const nL = document.createElement("div")
        nL.classList.add("nL")
        nL.innerHTML = labelsTXT[idx]

        labels.appendChild(n)
        labels.appendChild(nL)

        elm.appendChild(labels)
    })
}
EventTimerCreator()

const timerMax = [90, 24, 60, 60], converter = "1000 * 60 * 60 * 24"
export function EventTimerHandler() {
    let dD = currentEvent.date - Date.now()
    dataNextEvent[2].forEach((s, idx) => {
        const conv = eval(converter.slice(0, converter.length - 5*idx))
        const n = Math.floor(dD / conv)
        document.querySelector(`.eventTimerStroke.${s}`).style.strokeDasharray = `calc(var(--c) * ${n / timerMax[idx]}) var(--c)`
        dD -= n * conv

        document.querySelector(`.eventTimerLabels.${s} .n`).innerHTML = n
    })
}

//NOTE SponsorsScript

import { dataSponsorImgs } from "./data.js"
const homeSponsorsUI = document.getElementById("homeSponsorsUI")
let maxSponsors, minP
let sponsorCurrentImg = 0
let sponsorTranslation = 0

export function sponsorSliderHandler() {
    homeSponsorsUI.style.transform = `translateX(-${sponsorTranslation}%)`

    sponsorTranslation+=.03
    if ( sponsorTranslation + .03 >= minP) {
        sponsorTranslation = 0
        homeSponsorsUI.style.transform = `translateX(0%)`

        Array.from(homeSponsorsUI.children).forEach((elm, idx) => {
            if (idx == 0) {
                elm.remove()
                createSponsorElement(maxSponsors)
            } else {
                elm.style.gridColumn = idx
            }
        })
    }
}

function createSponsorElement(i) {
    const elm = document.createElement("div")
    homeSponsorsUI.appendChild(elm)
    elm.classList.add("sponsorSliderElement")
    elm.style.gridColumn = i

    const img = document.createElement("img")
    img.src = dataSponsorImgs[sponsorCurrentImg]
    img.loading = "lazy"

    elm.appendChild(img)
    
    sponsorCurrentImg = sponsorCurrentImg + 1 >= dataSponsorImgs.length ? 0 : sponsorCurrentImg + 1

    return elm
}

//!SECTION

//SECTION - TeamScript

import { dataTeamMembers, dataTeamConst } from "./data.js"
const teamMembersContainer = document.getElementById("teamMembersContainer")

const members = dataTeamMembers[MODE], mCount = members.length
let teamConsts = dataTeamConst[0]

//NOTE TeamUICreator
function TeamUICreator() {
    for (let i = 0; i < mCount; i++) {
        const elm = document.createElement("div")
        elm.classList.add("teamMember")
        elm.id = `teamP${i}`

        const img = document.createElement("div")
        img.classList.add("teamImg")
        img.style.backgroundImage = `url(${members[i].img})`
        elm.appendChild(img)

        const name = document.createElement("div")
        name.classList.add("teamName")
        name.innerHTML = members[i].name
        elm.appendChild(name)

        const role = document.createElement("div")
        role.classList.add("teamRole")
        role.innerHTML = members[i].role
        elm.appendChild(role)

        const txt = document.createElement("div")
        txt.classList.add("teamTxt")
        txt.innerHTML = members[i].txt
        elm.appendChild(txt)
        
        teamMembersContainer.appendChild(elm)
    }
    scrollFetchPosition(0)
}
TeamUICreator()

export function scrollFetchPosition(dir) {
    const defaultTheta = 2*Math.PI / mCount
    Array.from(teamMembersContainer.children).filter((e) => {if (e.id) return e}).forEach((e) => {
        let id = parseInt(e.id.replace("teamP", ""))
        id += dir
        id = id >= 0 ? id <= mCount - 1 ? id : 0 : mCount - 1

        e.style.zIndex = `${parseInt((Math.sin(defaultTheta*id+Math.PI/2)+teamConsts.kz)*100)+1000}`
        e.style.transform = `perspective(50vh) 
                                translateY(${(Math.sin(defaultTheta*id+teamConsts.a)+teamConsts.ky)*teamConsts.y}vw) 
                                translateZ(${(Math.sin(defaultTheta*id+teamConsts.a)+teamConsts.kz)*teamConsts.z}vw) 
                                translateX(${(Math.cos(defaultTheta*id+teamConsts.a)+teamConsts.kx)*teamConsts.x}vw)`
        e.id = `teamP${id}`
    })
}
//!SECTION

//SECTION - Utiliy

//NOTE - RoundTo
function roundTo(n, dec) {
    return Math.round(n/dec)*dec
}

//NOTE - IntervalHandler
import { dataIntervalsHandler } from "./data.js"

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = dataIntervalsHandler.find(t => t.id == entry.target.id)

        if (!target) return

        if (entry.isIntersecting) {
            target.fun()
            target.interval = setInterval(target.fun, target.ms)
            console.log("Started: " + target.id)
        } else {
            clearInterval(target.interval)
            console.log("Cleared: " + target.id)
        }

    })
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
})

//NOTE DeviceConstHandler
window.matchMedia("(orientation: portrait)").addEventListener("change", (e) => {DeviceConstHandler(e)})
DeviceConstHandler(window.matchMedia("(orientation: portrait)"))
function DeviceConstHandler(e) {
    if (e.matches) {
        homeSponsorsUI.style.width = "150%"
        homeSponsorsUI.style.gridTemplateColumns = "repeat(3, 1fr)"
        maxSponsors = 3
        
        teamConsts = dataTeamConst[1]
    } else {
        homeSponsorsUI.style.width = "125%"
        homeSponsorsUI.style.gridTemplateColumns = "repeat(5, 1fr)"
        maxSponsors = 5
        
        teamConsts = dataTeamConst[0]
    }

    //NOTE SponsorDeviceHandler
    homeSponsorsUI.innerHTML = ""
    minP = (1-1/maxSponsors)*100/(maxSponsors-1)
    for (let i = 0; i < maxSponsors; i++) {
        createSponsorElement(i+1)
    }
}

dataIntervalsHandler.forEach((e) => {observer.observe(document.getElementById(e.id))})

//!SECTION

//SECTION - Footer

//!SECTION