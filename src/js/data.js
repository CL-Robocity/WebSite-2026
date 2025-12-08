export const dataBarList =  [
    {name: "Home", id: "homeBox"},
    {name: "Team", id: "teamBox"},
    {name: "Robot", id: "robotBox"},
    {name: "Project", id: "projectBox"},
    {name: "Sponsor", id: "sponsorBox"},
    {name: "Contacts", id: "contactsBox"}
]

export const dataPropList = [
    "--NavBarHeight",
    "--NavBarPadding",
    "--NavBarLogoSize",
    "--NavBarLogoMargin",
    "--NavBarFontSize",
    "--HomeTitlePadding",
    "--HomeSubtitleFontSize",
    "--HomeButtonsPadding",
    "--HomeButtonsSize",
    "--SeparatorHeight",
    "--HomeImgSize",
    "--ModeSelectorWidth"
]

export const dataHomeImgList = [
    "./src/assets/img/home1.jpg",
    "./src/assets/img/home2.jpg",
    "./src/assets/img/home3.jpg",
    "./src/assets/img/home4.jpg",
    "./src/assets/img/home5.jpg",
    "./src/assets/img/home6.jpg",
    "./src/assets/img/home7.jpg",
    "./src/assets/img/home8.jpg"
]

export const dataNextEvent = [
    [{n: "Qualificazione Venezia&nbsp;-&nbsp;Mestre", date: new Date(2026, 1, 6, 8, 30, 0), l: "Mestre, Italia"}],
    [{n: "Italy Championship", date: new Date(2026, 2, 5, 8, 30, 0), l: "Cesenatico, Italia"}],
    ["d", "h", "m", "s"]
]

export const dataSponsorImgs = [
    "./src/assets/img/sponsor1.png",
    "./src/assets/img/home4.jpg",
    "./src/assets/img/home5.jpg",
    "./src/assets/img/home6.jpg",
    "./src/assets/img/home7.jpg",
    "./src/assets/img/home8.jpg"
]

export const dataTimerSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <circle class="eventBg" cx="256" cy="256" r="calc(256 - 25 / 2)"/> <circle class="eventTimerStroke" cx="256" cy="256" r="calc(256 - 25 / 2)"/></svg>'

import { EventTimerHandler } from "./script.js"
export const dataIntervalsHandler = [
    {id: "homeEventUI", fun: EventTimerHandler, ms: 1000, interval: null}
]