import express from "express";
import userModel from "./model.js";
import createError from "http-errors";
import { basicAuthMiddleware } from "../../auth/basic.js";

const userRouter = express.Router();

// GET /users
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/me/stories", basicAuthMiddleware, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    const modifiedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );
    res.send(modifiedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/me", basicAuthMiddleware, async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.author._id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// GET /users/:userId
userRouter.get("/:userId", basicAuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// POST /users
userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send({ _id });
  } catch (err) {
    next(err);
  }
});
// PUT /users/:userId
userRouter.put("/:userId", basicAuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
});
// DELETE /users/:userId
userRouter.delete("/:userId", basicAuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.userId);
    if (!user) {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default userRouter;
