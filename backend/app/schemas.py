# Define the Pydantic schema for FastAPI validation.
from pydantic import BaseModel

class UserSchema(BaseModel):
    name: str
    age: int
