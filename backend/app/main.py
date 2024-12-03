from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from fastapi.middleware.cors import CORSMiddleware
from app.models import User  # Import the User model
from app.schemas import UserSchema  # Import the UserSchema
import json

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.on_event("startup")
async def startup():
    # Initialize the database connection
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    await init_beanie(database=client.my_database, document_models=[User])

@app.post("/api/users")
async def create_user(user: UserSchema):
    try:
        # Extract field types dynamically from UserSchema
        field_types = {
            field: str(field_type.__name__)
            for field, field_type in UserSchema.__annotations__.items()
        }

        # Combine schema, values, and field types for storage
        schema = json.loads(UserSchema.schema_json())
        new_user = User(**user.dict(), schema=schema, field_types=field_types)
        await new_user.insert()

        return {"message": "User created successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating user: {str(e)}")
