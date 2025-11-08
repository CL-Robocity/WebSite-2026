//Coded by F. AIello

//Doc Elements
const styles = getComputedStyle(document.documentElement)
const bg = document.getElementById("particlesBg")

//Consts
const MaxPcount = parseInt(styles.getPropertyValue("--ParticleMaxCount").trim())
const MaxPsize = parseInt(styles.getPropertyValue("--ParticleMaxSize").trim())
const MinPsize = parseInt(styles.getPropertyValue("--ParticleMinSize").trim())
const MaxPspeed = parseInt(styles.getPropertyValue("--ParticleMaxSpeed").trim())
const MinPspeed = parseInt(styles.getPropertyValue("--ParticleMinSpeed").trim())
const pOpacity = parseInt(styles.getPropertyValue("--ParticleOpacity").trim())

//NOTE - particleHandler
function particleHandler() {
    Array.from(bg.children).forEach((child) => {
        child.style.top = "0%"
        child.style.transform = "rotateZ(1000deg)"
        child.style.opacity = `${pOpacity}%`

        if (child.getBoundingClientRect().top < 0) {
            child.remove()
        }
    })

    if (bg.children.length < MaxPcount) {
        const particle = document.createElement("div")
        particle.classList.add("particle")
        particle.style.width = `${Math.random()*(MaxPsize - MinPsize) + MinPsize}px`
        particle.style.top = "100%"
        particle.style.left = `${Math.random()*70 + 15}%`
        particle.style.transition = `all linear ${parseInt(Math.random() * (MaxPspeed - MinPspeed) + MinPspeed)}s`
        particle.style.opacity = "0%"
        bg.appendChild(particle)
    }

    const delay = parseInt((2 + (Math.random() * 2 - 1)) * 1000)
    setTimeout(particleHandler, delay)
}

document.addEventListener("DOMContentLoaded", () => {
    particleHandler()
})