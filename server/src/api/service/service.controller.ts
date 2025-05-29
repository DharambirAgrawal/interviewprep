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
  const { language, code, stdin } = req.body;
  if (!language || !code) {
    throw new AppError("Language and code are required!", 400);
  }
  const languageMap: Record<string, number> = {
    cpp: 54,
    python: 28,
    javascript: 63,
    java: 62,
    go: 60,
    typescript: 74,
    ruby: 72,
    csharp: 51,
    bash: 46,
  };

  const languageId = languageMap[language];
  if (!languageId) {
    throw new AppError("Unsupported language selected", 400);
  }
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "b4ca42b689msh8d2c931b57fb41cp1edd10jsn080642bd03b3",
      "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageId,
      source_code: code,
      stdin: "",
    }),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new AppError("Failed to compile code!", 500);
  }
  const data = await response.json();
  res.status(response.status).json({
    status: "success",
    data,
  });
};

// {
//   stdout: null,
//   time: '0.082',
//   memory: 27724,
//   stderr: '  File "/box/script.py", line 3\n' +
//     '    for i in range(10)\n' +
//     '    print(i)\n' +
//     '                      \n' +
//     "SyntaxError: expected ':'\n",
//   token: '8fa26ea3-e540-45c5-bed3-0e1f370a9011',
//   compile_output: null,
//   message: 'Exited with error status 1',
//   status: { id: 11, description: 'Runtime Error (NZEC)' }
// }
// {
//   stdout: '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n',
//   time: '0.043',
//   memory: 26676,
//   stderr: null,
//   token: 'cb111bb6-b05a-4d87-af05-2438b5a9360f',
//   compile_output: null,
//   message: null,
//   status: { id: 3, description: 'Accepted' }
// }
