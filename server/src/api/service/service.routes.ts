import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  audio_to_text,
  generate_questions,
  resume_to_text,
  code_compile,
} from "./service.controller";

const ServiceRouter = express.Router();

export const serviceRouter = ServiceRouter.post(
  "/strrt",
  catchAsync(audio_to_text)
)

  // .post("/resume-text", catchAsync(resume_to_text))
  // .post("/generate-question", catchAsync(generate_questions))
  .post("/code-compile", catchAsync(code_compile));
