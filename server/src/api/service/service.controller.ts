// ------------------------
// Proxy Audio File to STT
// ------------------------

export const audio_to_text = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const form = new FormData();
  form.append("file", req.file.buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype,
  });

  try {
    const response = await axios.post(`${PYTHON_API_URL}/api/stt`, form, {
      headers: {
        ...form.getHeaders(),
        "x-api-key": API_SECRET,
      },
    });
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: "STT failed", details: err.message });
  }
};

// ------------------------
// Proxy Resume File to Extract Text
// ------------------------

export const resume_to_text = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const form = new FormData();
  form.append("file", req.file.buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype,
  });

  try {
    const response = await axios.post(
      `${PYTHON_API_URL}/api/resume-text`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-api-key": API_SECRET,
        },
      }
    );
    res.json(response.data);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Resume parsing failed", details: err.message });
  }
};

// ------------------------
// Proxy Question Generation
// ------------------------

export const generate_questions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.post(
      `${PYTHON_API_URL}/api/generate-questions`,
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_SECRET,
        },
      }
    );
    res.json(response.data);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Question generation failed", details: err.message });
  }
};
