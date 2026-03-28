from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Lab 5 - Auth API")
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Lab 5 Auth API is running!"}
