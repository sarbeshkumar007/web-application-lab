from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth, todos

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Lab 6 - Todo API with Auth")
app.include_router(auth.router)
app.include_router(todos.router)

@app.get("/")
def root():
    return {"message": "Lab 6 Todo API is running!"}