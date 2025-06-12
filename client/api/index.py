import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
import tempfile
import whisper
from dotenv import load_dotenv

load_dotenv()  # Load env variables
from functions.resume_parser import extract_resume_text  
app = Flask(__name__)
model = whisper.load_model("base")
API_KEY = os.getenv("SOME_SECRET")

@app.route("/api/test")
def hello_world():
    return f"<p>Hello, World from flask!</p> {API_KEY}"

@app.route("/api/resume-text", methods=["POST"])
def resume_api():
    if 'resume' not in request.files:
        return {"error": "No file part in request"}, 400

    uploaded_file = request.files['resume']
    if uploaded_file.filename == '':
        return {"error": "No file selected"}, 400

    ext = os.path.splitext(uploaded_file.filename)[1].lower()
    if ext not in ['.pdf', '.docx']:
        return {"error": "Unsupported file type. Use PDF or DOCX."}, 400

    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        uploaded_file.save(tmp)
        tmp_path = tmp.name

    try:
        resume_text = extract_resume_text(tmp_path)
        print(len(resume_text))
        return {"text": resume_text}
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        os.remove(tmp_path)


@app.route("/api/audio-stream", methods=["POST"])
def transcribe_audio():
    audio = request.files.get("audio")
    if not audio:
        return jsonify({"error": "No audio received"}), 400

    ext = os.path.splitext(audio.filename)[1].lower()
    if ext not in [".mp3", ".wav", ".m4a", ".webm"]:
        return jsonify({"error": "Unsupported audio format"}), 400

    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmpfile:
        audio.save(tmpfile.name)

    try:
        # result = model.transcribe(tmpfile.name, fp16=False)
        result = model.transcribe(tmpfile.name, fp16=False, language="en", task="transcribe")


        # result = model.transcribe(tmpfile.name)
        text = result["text"]
        print("Transcript:", text)
        return jsonify({"success":True,"text": text})
    except Exception as e:
        print(e)
        return jsonify({"success":False,"error": str(e)}), 500
    finally:
        os.unlink(tmpfile.name)

@app.route("/api/video-stream", methods=["POST"])
def understand_video():
    return "Not implemented yet"

if __name__ == "__main__":
    app.run(port=5328, debug=True)
