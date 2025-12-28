import os
import json
import requests
import re
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")

API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "X-Wait-For-Model": "true",
    "Content-Type": "application/json",
    "Accept": "application/json"
}


def clean_llm_output(text: str) -> str:
    """
    Removes safety boilerplate, helper prompts,
    and dangling fragments.
    """

    blocked_phrases = [
        "simplify the following task",
        "short checklist",
        "samaritans",
        "confidential support",
        "mental health",
        "hotline",
        "crisis",
        "emergency",
        "visit www",
        "call ",
        "for ",
    ]

    lower = text.lower()
    for phrase in blocked_phrases:
        idx = lower.find(phrase)
        if idx != -1:
            text = text[:idx].strip()
            lower = text.lower()

    return text.strip()



def force_bullets(text: str) -> str:
    """
    Converts a long task sentence into clean bullet points
    by splitting on commas and conjunctions.
    """

   
    text = text.replace(" and ", ", ")

    parts = [p.strip() for p in text.split(",")]

    bullets = []
    for part in parts:
        if len(part) > 6:
            bullets.append(f"• {part.rstrip('.')}")

    return "\n".join(bullets)




def simplify_task(text: str):
    if not isinstance(text, str) or not text.strip():
        return "⚠️ No valid input text provided."

    
    formatted_input = (
        "Simplify the following task into a short checklist:\n\n"
        + text.strip()
    )

    payload = {
        "inputs": formatted_input
    }

    try:
        response = requests.post(
            API_URL,
            headers=headers,
            data=json.dumps(payload),
            timeout=90
        )

        if response.status_code == 200:
            raw = response.json()[0]["summary_text"]
            cleaned = clean_llm_output(raw)
            return force_bullets(cleaned)

        return f"⚠️ LLM error ({response.status_code}): {response.text}"

    except Exception as e:
        return f"⚠️ LLM exception: {str(e)}"
