import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import { login, signup } from "./auth.controller";

const AuthRouter = express.Router();

export const authRouter = AuthRouter.post("/login", catchAsync(login)).post(
  "/signup",
  catchAsync(signup)
);



// .post("/reset-password",catchAsync(resetPassword))
