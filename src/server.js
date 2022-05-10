import express from "express"
import authorRouter from "./apis/authors/index.js"
import listEndPoints from "express-list-endpoints"
import cors from "cors"

const server = express()

server.use(cors())

const port = 3003

server.use(express.json())


server.use("/authors", authorRouter)


server.listen(port, () => {
    console.table(listEndPoints(server))
    console.log(`Rasmus, for your information: server is running on port ${port}`)
})