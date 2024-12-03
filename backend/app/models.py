from typing import Optional, Dict, Any
from beanie import Document
from pydantic import Field
from datetime import datetime

class User(Document):
    form_fields: Dict[str, str]
    uiSchema: Dict = {}

    class Settings:
        collection = "users"

class UserSubmission(Document):
    user_id: str  # Link to the existing user
    submission: Dict[str, Any]  # Store the form submission data
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "user_submissions"  # Collection name
