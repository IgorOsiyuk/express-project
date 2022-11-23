import express from "express"
import cors from "cors"
import { fileURLToPath } from "node:url";
import path from "node:path"
import planetRouter from './routes/planets/planets.router.js'

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json())
app.use(express.static(path.join(__dirname, "..", 'public')))

app.use(planetRouter)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', "index.html"))
})

export default app