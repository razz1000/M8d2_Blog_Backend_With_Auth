
import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"



const blogPostsRouter = express.Router()
const blogPostsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "blogPosts.json")
const getBlogPosts = () => JSON.parse(fs.readFileSync(blogPostsJSONPath))
const writeBlogPost = blogPostsArray => fs.writeFileSync(blogPostsJSONPath, JSON.stringify(blogPostsArray))


blogPostsRouter.post("/", (request, response) => {
    const newBlogPost = {...request.body, createdAt: new Date(), id: uniqid() }
    
    const blogPost = getBlogPosts()
    blogPost.push(newBlogPost)
    writeBlogPost(blogPost)
    response.status(201).send({ id: newBlogPost.id})
})
blogPostsRouter.get("/", (request, response) => {
    const blogposts = getBlogPosts()
    console.log("This is the content:", blogposts)
    response.send(blogposts)
 })
blogPostsRouter.get("/:postId", (request, response) => {
   const blogposts = getBlogPosts()
   const blogPostsFound = blogposts.find(post => post.id === request.params.postId)
   response.send(blogPostsFound)
})
blogPostsRouter.put("/:postId", (request, response) => {
    const blogposts = getBlogPosts()
    console.log("these are the blogposts:", blogposts)
    const index = blogposts.findIndex(post => post.id === request.params.postId)
    if (index !== -1) {
        const oldPost = blogposts[index]
        const updatedBlogPost = {...oldPost, ...request.body, updatedAt: new Date() }
        blogposts[index] = updatedBlogPost
        writeBlogPost(blogposts)
        response.send(updatedBlogPost)
    }
 
})
blogPostsRouter.delete("/:postId", (request, response) => {
   const blogposts = getBlogPosts()
   const remainingBlogPosts = blogposts.filter(post => post.id !== request.params.postId)
   writeBlogPost(remainingBlogPosts)
   response.status(204).send()


})


export default blogPostsRouter












