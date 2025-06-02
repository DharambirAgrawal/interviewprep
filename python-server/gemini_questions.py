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




# export function generateInterviewPrompt(userData: UserData) {
#   const {
#     firstName,
#     lastName,
#     interviewType,
#     jobTitle,
#     targetIndustry,
#     interviewStyle,
#     interviewDifficulty,
#     additionalNotes,
#     primarySkills,
#     weakAreas,
#     interviewComfortLevel,
#     resumeText,
#   } = userData;

#   const skillList = primarySkills?.join(", ") || "";
#   const weakList = weakAreas?.join(", ") || "";

#   const prompt = `
# You are an experienced interviewer conducting a ${interviewType.toLowerCase()} interview for the role of ${jobTitle}.
# The candidate's name is ${firstName} ${lastName}, applying in the ${targetIndustry || "tech"} industry.

# Here's what you know about them:
# - Resume summary: ${resumeText.substring(0, 800)}
# - Primary skills: ${skillList}
# ${weakList ? `- Weak areas: ${weakList}` : ""}
# ${interviewStyle ? `- Interview style: ${interviewStyle}` : ""}
# ${interviewDifficulty ? `- Interview difficulty: ${interviewDifficulty}` : ""}
# ${additionalNotes ? `- Notes: ${additionalNotes}` : ""}
# ${interviewComfortLevel ? `- Self-rated comfort level: ${interviewComfortLevel}` : ""}

# Your tone should feel natural and human, like a real interviewer. Include moments like:
# - "Hey, thanks for joining..."
# - "Umm, let's see..."
# - "Hmm, tell me more about that..."

# Structure the output as JSON like this:
# [
#   {
#     "question": "Hi ${firstName}, let’s start with something simple. Can you tell me a bit about your experience with ${primarySkills[0]}?",
#     "follow_ups": [
#       "What projects did you use it on?",
#       "What was the hardest problem you solved using it?"
#     ]
#   },
#   ...
# ]

# Use a conversational tone, include follow-ups, and try to create a dynamic flow of questions — not just a static list. Make it feel like a real voice-driven interview session.
# `;

#   return {
#     interviewer_prompt: prompt.trim(),
#     metadata: {
#       interviewType,
#       jobTitle,
#       skills: primarySkills,
#       weakAreas,
#       interviewStyle,
#       interviewDifficulty,
#       interviewComfortLevel,
#     },
#   };
# }
