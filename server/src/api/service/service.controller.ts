import express, { Request, Response } from "express";
import FormData from "form-data";
import { AppError } from "../../errors/AppError";

// ------------------------
// Proxy Audio File to STT
// ------------------------
const PYTHON_API_URL = process.env.PYTHON_API_URL;
const PYTHON_API_SECRET = process.env.PYTHON_API_SECRET;

export const audio_to_text = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const form = new FormData();
  form.append("file", req.file.buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype,
  });

  try {
    const response = await fetch(`${PYTHON_API_URL}/api/stt`, {
      method: "POST",
      headers: {
        ...form.getHeaders(),
        "x-api-key": PYTHON_API_SECRET,
      },
      body: form as any,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err: any) {
    res.status(500).json({ error: "STT failed", details: err.message });
  }
};

// ------------------------
// Proxy Resume File to Extract Text
// ------------------------

export const resume_to_text = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const form = new FormData();
  form.append("file", req.file.buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype,
  });

  try {
    const response = await fetch(`${PYTHON_API_URL}/api/resume-text`, {
      method: "POST",
      headers: {
        ...form.getHeaders(),
        "x-api-key": PYTHON_API_SECRET,
      },
      body: form as any,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Resume parsing failed", details: err.message });
  }
};

// ------------------------
// Proxy Question Generation
// ------------------------

export const generate_questions = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${PYTHON_API_URL}/api/generate-questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": PYTHON_API_SECRET,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Question generation failed", details: err.message });
  }
};

export const code_compile = async (req: Request, res: Response) => {
  const response = await fetch(process.env.JUDGE0_API!, {
    method: "POST",
    body: JSON.stringify({
      // @ts-ignore
      source_code: req.body.source_code,
      language_id: req.body.language_id,
      stdin: req.body.stdin || "",
    }),
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    throw new AppError("Failed to compile code!", 500);
  }
};
