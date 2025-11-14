import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()
app.use("/src", express.static(path.join(__dirname, "src")))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"))
})

app.set("trust proxy", true)

app.listen(PORT, () => {
    console.log(`PORT ${PORT} OPEN`)
})