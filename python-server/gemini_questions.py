import google.generativeai as genai
import os
import re
import json

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

def generate_interview_questions(first_name, last_name, resume_items, interview_type, specific_focus=None):
    model = genai.GenerativeModel("gemini-2.5-flash-preview-04-17")

    resume_summary = "\n".join(f"- {item}" for item in resume_items)
    specific_part = f" with a focus on {specific_focus}" if specific_focus else ""

    prompt = f"""
You are an experienced interviewer conducting a {interview_type} interview{specific_part}.
The candidate's name is {first_name} {last_name}.
Their resume includes:
{resume_summary}

Generate realistic, structured interview questions. Include follow-ups. Make it feel like a real conversation — start broad, then dig deeper based on each item. Return a list of questions like:
[
  {{
    "question": "...",
    "follow_ups": ["...", "..."]
  }},
  ...
]
"""

    response = model.generate_content(prompt)
    try:
        json_text = re.search(r"\[\s*{.*}\s*]", response.text, re.DOTALL)
        if json_text:
            questions = json.loads(json_text.group())
        else:
            questions = response.text
        return questions
    except Exception:
        return response.text
