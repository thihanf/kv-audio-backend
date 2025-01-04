import express from "express";
import { registerUser, loginUser } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser); //by default this post request runs because of ("/") no value = default

userRouter.post("/login", loginUser); // if a /login is added this post request runs

export default userRouter;
