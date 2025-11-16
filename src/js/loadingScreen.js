let prg = 0;
const progressBar = document.getElementById("loaderProgressBar")
const loader = document.getElementById("loader")

function progress() {
    let t = setInterval(() => {
        let i

        if (prg < 40) i = Math.random() * 10 + 2
        else if (prg < 60) i = Math.random() * 2 + 1
        else if (prg < 97) i = Math.random()
        else i = 0

        prg = Math.min(prg + i, 97)
        progressBar.style.width = prg + "%"
    }, 120)

    // When real content is ready:
    window.addEventListener("load", () => {
        clearInterval(t);
        progressBar.style.width = "100%"
        setTimeout(() => hideLoader(), 400)
        document.documentElement.style.setProperty("--scrollToggle", "unset")
    })
}

function hideLoader() {
    loader.style.transform = "translateY(-100%)"
    setTimeout(() => progressBar.style.width = "0%", 300)
}

progress()
