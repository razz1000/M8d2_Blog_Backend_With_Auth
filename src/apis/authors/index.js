import express from "express";
import createError from "http-errors";
import uniqid from "uniqid";
import multer from "multer";
import {
  getAuthors,
  writeAuthors,
  saveAuthorsAvatars,
} from "../../lib/fsTools.js";
import { sendRegistrationEmail } from "../../lib/email-tools.js";
import AuthorModel from "./model.js";
import { basicAuthMiddleware } from "../../auth/basic.js";
import { adminOnlyMiddleware } from "../../auth/admin.js";

const authorsRouter = express.Router();

// POST /authors
authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body);
    const { _id } = await newAuthor.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

authorsRouter.get(
  "/",
  basicAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const author = await AuthorModel.find({});
      res.send(author);
    } catch (error) {
      next(error);
    }
  }
);

authorsRouter.get(
  "/me/stories",
  basicAuthMiddleware,
  async (req, res, next) => {
    try {
      res.send(req.author);
    } catch (error) {
      next(error);
    }
  }
);

authorsRouter.put("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    const modifiedAuthor = await AuthorModel.findByIdAndUpdate(
      req.author._id,
      req.body,
      { new: true }
    );
    res.send(modifiedAuthor);
  } catch (error) {
    next(error);
  }
});

authorsRouter.delete("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    await AuthorModel.findByIdAndDelete(req.author._id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

authorsRouter.get(
  "/:authorId",
  basicAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const author = await AuthorModel.findById(req.params.authorId);
      if (author) {
        res.send(author);
      } else {
        next(
          createError(404, `User with id ${req.params.authorId} not found!`)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

authorsRouter.put(
  "/:authorId",
  basicAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const updatedAuthor = await AuthorModel.findByIdAndUpdate(
        req.params.authorId,
        req.body,
        { new: true, runValidators: true }
      );
      if (updatedAuthor) {
        res.send(updatedAuthor);
      } else {
        next(
          createError(404, `User with id ${req.params.authorId} not found!`)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

authorsRouter.delete(
  "/:authorId",
  basicAuthMiddleware,
  adminOnlyMiddleware,
  async (req, res, next) => {
    try {
      const deletedAuthor = await AuthorModel.findByIdAndDelete(
        req.params.authorId
      );
      if (deletedAuthor) {
        res.status(204).send();
      } else {
        next(
          createError(404, `User with id ${req.params.authorId} not found!`)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default authorsRouter;
