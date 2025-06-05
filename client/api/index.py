import os
import subprocess
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import imageio_ffmpeg
os.environ["PATH"] += os.pathsep + os.path.dirname(imageio_ffmpeg.get_ffmpeg_exe())


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


    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmpfile:
        audio.save(tmpfile.name)

    try:
        print("....................... Transcribing audio .......................")
        print("Uploaded audio filename:", audio.filename)
        print("Content type:", audio.content_type)
        print("Temp file path:", tmpfile.name)
        print("File size:", os.path.getsize(tmpfile.name))
        print("....................... Transcribing audio .......................")

        # result = model.transcribe(tmpfile.name)
        
        result = model.transcribe("Audio-Introduction-0.1.mp3")  # Can be mp3, wav, m4a, etc.

        text = result["text"]
        # Print the transcribed text
        print(result["text"])

        # Optional: call Gemini API here with `text`
        print("Transcript:", text)
        return jsonify({"text": text})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    finally:
        os.unlink(tmpfile.name)





if __name__ == "__main__":
    app.run(port=5328, debug=True)
