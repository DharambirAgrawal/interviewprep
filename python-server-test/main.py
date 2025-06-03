from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
import os
import tempfile
from dotenv import load_dotenv

load_dotenv()  # Load env variables

from whisper_stt import transcribe_audio
from resume_parser import extract_resume_text
from gemini_questions import generate_interview_questions

app = FastAPI()

@app.post("/api/stt")
async def stt_api(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename[-4:]) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name
    try:
        result = transcribe_audio(tmp_path)
        return {"transcript": result}
    finally:
        os.remove(tmp_path)

@app.post("/api/resume-text")
async def resume_api(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename[-5:]) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name
    try:
        resume_text = extract_resume_text(tmp_path)
        return {"text": resume_text}
    finally:
        os.remove(tmp_path)

@app.post("/api/generate-questions")
async def questions_api(
    first_name: str = Form(...),
    last_name: str = Form(...),
    interview_type: str = Form(...),
    resume_items: str = Form(...),
    specific_focus: str = Form(None)
):
    items = [item.strip() for item in resume_items.split("\n") if item.strip()]
    result = generate_interview_questions(first_name, last_name, items, interview_type, specific_focus)
    return JSONResponse(content={"questions": result})
# uvicorn main:app --reload --host 0.0.0.0 --port 8000
