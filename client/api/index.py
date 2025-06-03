import tempfile
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from flask import Flask, request

from dotenv import load_dotenv

load_dotenv()  # Load env variables
from functions.resume_parser import extract_resume_text  
app = Flask(__name__)
API_KEY = os.getenv("SOME_SECRET")
ENVIRONMENT = os.getenv("ENV", "development")

@app.route("/api/test")
def hello_world():
    return f"<p>Hello, World from flask!</p> {API_KEY}"

@app.route("/api/resume-text", methods=["POST"])
def resume_api():
    print(request.files)
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

if __name__ == "__main__":
    app.run(port=5328, debug=True)
