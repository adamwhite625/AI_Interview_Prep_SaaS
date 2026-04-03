from openai import OpenAI
import os
from app.schemas.interview import InterviewPrep
from app.prompts.interview import build_system_prompt

def get_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")
    return OpenAI(api_key=api_key)

def stream_interview_prep(prep: InterviewPrep):
    client = get_client()

    system_prompt = build_system_prompt(prep)

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Generate interview prep."},
    ]

    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        stream=True,
    )

    for chunk in stream:
        delta = chunk.choices[0].delta
        if delta and delta.content:
            yield delta.content