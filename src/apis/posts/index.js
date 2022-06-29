import express from "express";
import createError from "http-errors";
import PostModel from "./model.js";
import { basicAuthMiddleware } from "../../auth/basic.js";
import { adminOnlyMiddleware } from "../../auth/admin.js";

const postsRouter = express.Router();

// POST
postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body);
    const { _id } = await newPost.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

//GET
postsRouter.get(
  "/",
  /*   basicAuthMiddleware,
  adminOnlyMiddleware, */
  async (req, res, next) => {
    try {
      const post = await PostModel.find({});
      res.send(post);
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.get(
  "/me/stories",
  basicAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const post = await PostModel.find({ author: req.user._id.toString() });
      res.send(post);
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.get(
  "/:postId",
  basicAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const post = await PostModel.findById(req.params.postId);
      if (post) {
        res.send(post);
      } else {
        next(createError(404, `Post with id ${req.params.postId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.put(
  "/:postId",
  basicAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.postId,
        req.body,
        { new: true, runValidators: true }
      );
      if (updatedPost) {
        res.send(updatedPost);
      } else {
        next(createError(404, `Post with id ${req.params.postId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.delete(
  "/:postId",
  basicAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const deletedPost = await PostModel.findByIdAndDelete(req.params.postId);
      if (deletedPost) {
        res.status(204).send();
      } else {
        next(createError(404, `User with id ${req.params.postId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

////******* */
/* 
const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "strive-blog/posts",
    },
  }),
  fileFilter: (req, file, multerNext) => {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      multerNext(createError(400, "Only png/jpeg allowed!"));
    } else {
      multerNext(null, true);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 },
}).single("cover");
 */
// GET /blogPosts
/* postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await findPost();
    if (req.query && req.query.title) {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(req.query.title.toLowerCase())
      );
      res.send(filteredPosts);
    } else {
      res.send(posts);
    }
  } catch (error) {
    next(error);
  }
}); */

// POST /blogPosts
/* postsRouter.post(
  "/",
  checkPostSchema,
  checkPostValidationResult,
  async (req, res, next) => {
    try {
      const id = await saveNewPost(req.body);
      res.status(201).send({ id });
    } catch (error) {
      next(error);
    }
  }
); */

// GET /blogPosts/:id
/* postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await findPostById(req.params.postId);
    res.send(post);
  } catch (error) {
    next(error);
  }
}); */

// PUT /blogPosts/:id
/* postsRouter.put(
  "/:postId",
  checkPostUpdateSchema,
  checkPostValidationResult,
  async (req, res, next) => {
    try {
      const updatedPost = await findPostByIdAndUpdate(
        req.params.postId,
        req.body
      );
      res.send(updatedPost);
    } catch (error) {
      next(error);
    }
  }
); */

// DELETE /blogPosts/:id
/* postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const post = await findPostById(req.params.postId);
    await deletePostsImages(post.cover);
    await findPostByIdAndDelete(req.params.postId);
  } catch (error) {
    next(error);
  }
}); */
//POST /blogPosts/:id/uploadCover, uploads a picture (save as idOfTheBlogPost.jpg in the public/img/blogPosts folder) for the blog post specified by the id. Store the newly created URL into the corresponding post in blogPosts.json

/* postsRouter.post(
  "/:postId/cover",
  cloudinaryUploader,
  async (req, res, next) => {
    try {
      console.log("FILE: ", req.file);
      
      const post = await findPostById(req.params.postId);
      const updatedPost = await findPostByIdAndUpdate(req.params.postId, {
        cover: req.file.path,
      });
      res.send(updatedPost);
    } catch (error) {
      next(error);
    }
  }
); */
//GET /blogPosts/:id/comments, get all the comments for a specific post
/* postsRouter.get("/:postId/comments", async (req, res, next) => {
  try {
    const { comments } = await findPostById(req.params.postId);
    res.send(comments);
  } catch (error) {
    next(error);
  }
}); */
//POST /blogPosts/:id/comments, create a new comment for a specific post
/* postsRouter.post(
  "/:postId/comments",
  checkCommentSchema,
  checkPostValidationResult,
  async (req, res, next) => {
    try {
      const updatedPost = await saveNewComment(req.params.postId, req.body);
      res.send(updatedPost);
    } catch (error) {
      next(error);
    }
  }
); */

/* postsRouter.get("/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const comment = await findCommentById(
      req.params.postId,
      req.params.commentId
    );
    res.send(comment);
  } catch (error) {
    next(error);
  }
}); */

/* postsRouter.put(
  "/:postId/comments/:commentId",
  checkCommentUpdateSchema,
  checkPostValidationResult,
  async (req, res, next) => {
    try {
      const updatedComment = await findCommentByIdAndUpdate(
        req.params.postId,
        req.params.commentId,
        req.body
      );
      res.send(updatedComment);
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.delete("/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const review = await findCommentByIdAndDelete(
      req.params.postId,
      req.params.commentId
    );
    res.send(review);
  } catch (error) {
    next(error);
  }
});
 */
export default postsRouter;
