from typing import Optional, Dict
from beanie import Document

class User(Document):
    form_fields: Dict[str, str]
    uiSchema: Dict = {}

    class Settings:
        collection = "users"
