import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import { user_onboarding, get_onboarded_user } from "./onboard.controller";

const OnboardRouter = express.Router();

export const onboardRouter = OnboardRouter.post(
  "/user",
  catchAsync(user_onboarding)
).get("/user/:id", catchAsync(get_onboarded_user));
