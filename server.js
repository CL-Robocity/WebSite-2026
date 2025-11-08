import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()
app.use(express.static(path.join(__dirname, "assets")))
app.set("trust proxy", true)

app.listen(PORT, () => {
    console.log(`PORT ${PORT} OPEN`)
})