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
    "./src/assets/img/img1.jpg",
    "./src/assets/img/img2.jpg",
    "./src/assets/img/img3.jpg",
    "./src/assets/img/img4.jpg",
    "./src/assets/img/img5.jpg"
]

export const dataNextEvent = [
    [{n: "Qualificazione Venezia&nbsp;-&nbsp;Mestre", date: new Date(2026, 1, 6, 8, 30, 0), l: "Mestre, Italia"}],
    [{n: "Italy Championship", date: new Date(2026, 2, 5, 8, 30, 0), l: "Cesenatico, Italia"}],
    ["d", "h", "m", "s"]
]

export const dataTimerSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <circle class="eventBg" cx="256" cy="256" r="calc(256 - 25 / 2)"/> <circle class="eventTimerStroke" cx="256" cy="256" r="calc(256 - 25 / 2)"/></svg>'

import { EventTimerHandler } from "./script"
export const dataIntervalsHandler = [
    {id: "homeEventUI", fun: EventTimerHandler, ms: 1000, interval: null}
]