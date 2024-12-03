from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from fastapi.middleware.cors import CORSMiddleware
from app.models import User
from app.schemas import UserSchema
import json

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        form_fields = {
            field: str(field_type.__name__)
            for field, field_type in UserSchema.__annotations__.items()
        }

        uiSchema = {
            "first_name": {
                "ui:autofocus": True,
                "ui:placeholder": "Enter your first name"
            },
            "last_name": {
                "ui:placeholder": "Enter your last name"
            },
            "age": {
                "ui:widget": "updown",
                "ui:title": "Age",
                "ui:description": "Enter your age in years"
            },
            "bio": {
                "ui:widget": "textarea",
                "ui:description": "Short bio about yourself"
            },
            "password": {
                "ui:widget": "password",
                "ui:help": "Make sure your password is strong!"
            },
            "telephone": {
                "ui:options": {
                    "inputType": "tel"
                },
                "ui:placeholder": "Enter your phone number"
            },
        }

        new_user = User(
            form_fields=form_fields,
            uiSchema=uiSchema,
        )
        await new_user.insert()

        return {"message": "User created successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating user: {str(e)}")


@app.get("/api/users/{user_id}")
async def get_user(user_id: str):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"form_fields": user.form_fields, "uiSchema": user.uiSchema}