from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models import User
from app.schemas import UserSchema
from fastapi.middleware.cors import CORSMiddleware

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
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    await init_beanie(database=client.my_database, document_models=[User])

@app.post("/api/users")
async def create_user(user: UserSchema):
    try:
        new_user = User(**user.dict())
        await new_user.insert()
        return {"message": "User created successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
