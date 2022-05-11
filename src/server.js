import express from "express"
import authorRouter from "./apis/authors/index.js"
import blogPostsRouter from "./apis/blogposts/index.js"
import listEndPoints from "express-list-endpoints"
import cors from "cors"
import { badRequestErrorHandler, unathorizedErrorHandler, notFoundErrorHandler, genericErrorHandler } from "./errorHandlers.js"

const server = express()
const port = 3003



server.use(cors())
server.use(express.json())



server.use("/authors", authorRouter)
server.use("/blogposts", blogPostsRouter)

//------ ERROR HANDLERS------
server.use(badRequestErrorHandler)
server.use(unathorizedErrorHandler)
server.use(notFoundErrorHandler)
server.use(genericErrorHandler)



server.listen(port, () => {
    console.table(listEndPoints(server))
    console.log(`Rasmus, for your information: server is running on port ${port}`)
})