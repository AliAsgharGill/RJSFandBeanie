from typing import Optional
from beanie import Document

class User(Document):
    # name: str
    # age: Optional[int]
    # is_active: bool
    # schema: dict  # Store the schema as a JSON field
    field_types: dict  # Store field types dynamically

    class Settings:
        collection = "users"
