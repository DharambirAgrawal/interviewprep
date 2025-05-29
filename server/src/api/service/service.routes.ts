import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  audio_to_text,
  generate_questions,
  resume_to_text,
} from "./service.controller";

const ServiceRouter = express.Router();

export const serviceRouter = ServiceRouter.post(
  "/stt",
  catchAsync(audio_to_text)
)

  .post("/resume-text", catchAsync(resume_to_text))
  .post("/generate-question", catchAsync(generate_questions));
// .post("/reset-password",catchAsync(resetPassword))
