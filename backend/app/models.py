# Define the database model using Beanie.
from beanie import Document

class User(Document):
    name: str
    age: int