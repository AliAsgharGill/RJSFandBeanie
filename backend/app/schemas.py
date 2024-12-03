from pydantic import BaseModel
from typing import Optional

class UserSchema(BaseModel):
    name: str
    age: Optional[int]
    is_active: bool
