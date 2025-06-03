# # from flask import Flask

# # app = Flask(__name__)

# # @app.route('/')
# # def home():
# #     return 'Hello, World!'

# # @app.route('/about')
# # def about():
# #     return 'About'

# from flask import Flask
# from flask import request

# import tempfile
# import os
# from functions.resume_parser import extract_resume_text
# app = Flask(__name__)

# @app.route("/api/test")
# def hello_world():
#     return "<p>Hello, World from flask!</p>"


# @app.route("/api/resume-text", methods=["POST"])
# def resume_api():
#     print(request)
#     uploaded_file = request.files['file']
#     with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_file.filename)[1]) as tmp:
#         uploaded_file.save(tmp)
#         tmp_path = tmp.name
#     try:
#         resume_text = extract_resume_text(tmp_path)
#         print(resume_text)
#         return {"text": resume_text}
#     finally:
#         os.remove(tmp_path)


# if __name__ == "__main__":
#     app.run(port=5328, debug=True)
from flask import Flask, request
import tempfile
import os
from dotenv import load_dotenv

load_dotenv()  # Load env variables
from functions.resume_parser import extract_resume_text  # make sure this import is correct

app = Flask(__name__)
API_KEY = os.getenv("SOME_SECRET")

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

# if __name__ == "__main__":
#     app.run(port=5328, debug=True)
