import express from "express";
import userModel from "./model.js";
import PostModel from "../posts/model.js";
import createError from "http-errors";
import passport from "passport";
import { basicAuthMiddleware } from "../../auth/basic.js";
import { JWTAuthMiddleware } from "../../auth/token.js";
import { generateAccessToken } from "../../auth/tools.js";

const userRouter = express.Router();

userRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
); // The purpose of this endpoint is to redirect users to Google Consent Screen
userRouter.get(
  "/googleRedirect",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    // The purpose of this endpoint is to receive a response from Google, execute the google callback function, then send a response to the client
    try {
      const { token } = req.user; // passportNext is adding accessToken and refreshToken to req.user
      console.log("TOKEN", token);
      // res.send({ accessToken, refreshToken })
      res.redirect(`${process.env.FE_URL}/me/${token}`);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.checkCredentials(email, password);

    if (user) {
      const accessToken = await generateAccessToken({
        _id: user._id,
        role: user.role,
      });
      res.send({ accessToken });
    } else {
      next(createError(401, "Credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

// POST // MAKING A NEW USER
userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send({ _id });
  } catch (err) {
    next(err);
  }
});

userRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    /*     const me = await userModel.findById(req.user._id); */
    /*     const blogs = await userModel.find({ user: req.user._id.toString() }); */
    const blogs = await PostModel.find({ user: req.user._id.toString() });

    res.send(blogs);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me/stories", JWTAuthMiddleware, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
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

userRouter.delete("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.author._id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// GET /users
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// GET /users/:userId
userRouter.get("/:userId", JWTAuthMiddleware, async (req, res, next) => {
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

// PUT /users/:userId
userRouter.put("/:userId", JWTAuthMiddleware, async (req, res, next) => {
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
userRouter.delete("/:userId", JWTAuthMiddleware, async (req, res, next) => {
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
