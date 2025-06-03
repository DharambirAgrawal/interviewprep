# from flask import Flask

# app = Flask(__name__)

# @app.route('/')
# def home():
#     return 'Hello, World!'

# @app.route('/about')
# def about():
#     return 'About'

from flask import Flask
import tempfile
app = Flask(__name__)

@app.route("/api/test")
def hello_world():
    return "<p>Hello, World from flask!</p>"


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
