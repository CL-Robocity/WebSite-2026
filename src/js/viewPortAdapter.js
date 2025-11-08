const styles = getComputedStyle(document.documentElement)
import {dataPropList as propList } from "./data.js"
let lastSize = {w: 1920, h: 1080}

function adapt() { 
    propList.forEach((prop) => {
        const val = styles.getPropertyValue(prop.id).trim()
        if (val.endsWith("px")) {
            const px = parseInt(val.slice(0, -2))
            const adapted = !prop.dir ? px * screen.width / lastSize.w : px * screen.height / lastSize.h
            document.documentElement.style.setProperty(prop.id, `${adapted}px`)
        }
    })
    lastSize = {w: screen.width, h: screen.height}
}

adapt()
window.addEventListener("resize", () => {adapt()})
