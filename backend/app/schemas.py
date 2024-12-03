from pydantic import BaseModel, EmailStr
from typing import Optional

class UserSchema(BaseModel):
    first_name: str
    last_name: str
    age: int
    bio: Optional[str]
    password: str
    telephone: str
