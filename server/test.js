// pages/api/run.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

const languageMap: Record<string, number> = {
  cpp: 54,
  python: 71,
  javascript: 63,
};

interface RunRequestBody {
  language: string;
  code: string;
  input: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { language, code, input } = req.body as RunRequestBody;

  const language_id = languageMap[language];
  if (!language_id) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  try {
    const response = await axios.post(
      JUDGE0_API,
      {
        source_code: code,
        language_id,
        stdin: input,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    const output = response.data.stdout || response.data.stderr || "No output";
    res.status(200).json({ output });
  } catch (err) {
    console.error("Error executing code:", err);
    res.status(500).json({ error: "Execution failed" });
  }
}
