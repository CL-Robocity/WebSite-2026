const styles = getComputedStyle(document.documentElement)
import {dataPropList as propList } from "./data.js"
import {dataResList as resList } from "./data.js"
let lastSize = 1920
const m = screen.width < 1270

function adapt() { 
    if (!m) {
        const resize = resList.filter(a => a >= screen.width)[0] / lastSize
        console.log(resList.filter(a => a >= screen.width)[0], window.screen.height, window.devicePixelRatio)
        propList.forEach((prop) => {
            const val = styles.getPropertyValue(prop).trim()
            if (val.endsWith("px")) {
                const px = parseInt(val.slice(0, -2))
                const adapted = px * resize
                document.documentElement.style.setProperty(prop, `${adapted}px`)
            }
        })
        lastSize = resList.filter(a => a >= screen.width)[0]

        window.scrollTo(0, 0)
    }
}

setTimeout(() => adapt(), 1000)
window.addEventListener("resize", () => {setTimeout(() => adapt(), 300)})
