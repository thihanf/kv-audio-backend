import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// thsi clones the env file and load the env to access it.
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  let token = req.header("Authorization");

  if (token != null) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
    });
  }
  next();
});

// displaying this in github will be unethical as everyone can access it.(Enviorment variable),So we link it to the env file.
let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established succesfully");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//nodemon reloads the server automatically when a change is made
