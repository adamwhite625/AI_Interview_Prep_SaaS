from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class InterviewPrep(BaseModel):
    full_name: str
    target_role: Optional[str] = None
    experience_level: Optional[str] = None
    target_company: Optional[str] = None
    technical_skills: List[str] = []
    years_of_experience: Optional[int] = None
    current_role: Optional[str] = None
    projects_summary: str
    interview_date: Optional[date] = None