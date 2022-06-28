import express from "express";
import mongoose from "mongoose";
import authorsRouter from "./apis/authors/index.js";
import postsRouter from "./apis/posts/index.js";
import filesRouter from "./apis/files/index.js";
import { join } from "path";
import listEndpoints from "express-list-endpoints";
import createError from "http-errors";
import cors from "cors";
import {
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} from "./errorHandlers.js";
import swaggerUIExpress from "swagger-ui-express";
import yaml from "yamljs";
import userRouter from "./apis/users/index.js";

const server = express();
const port = process.env.PORT || 3001;

// ************************************** MIDDLEWARES *****************************************

server.use(cors());
server.use(express.json());

// ************************************** ENDPOINTS *******************************************
server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);
server.use("/users", userRouter);

// ************************************* ERROR HANDLERS ***************************************
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
  });
});
