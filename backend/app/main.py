from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from app.api.interview import router as interview_router

app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "ok"}

app.include_router(interview_router, prefix="/api")