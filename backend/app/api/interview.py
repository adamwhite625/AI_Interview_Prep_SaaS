from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from fastapi_clerk_auth import ClerkConfig, ClerkHTTPBearer, HTTPAuthorizationCredentials
import os
import json
from app.schemas.interview import InterviewPrep
from app.services.service import stream_interview_prep

router = APIRouter()

clerk_config = ClerkConfig(jwks_url=os.getenv("CLERK_JWKS_URL"))
clerk_guard = ClerkHTTPBearer(clerk_config)


@router.post("/interview")
def interview_preparation(
    prep: InterviewPrep,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
):
    stream = stream_interview_prep(prep)

    def event_stream():
        for text in stream:
            payload = json.dumps({"chunk": text})
            yield f"data: {payload}\n\n"


    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
    )