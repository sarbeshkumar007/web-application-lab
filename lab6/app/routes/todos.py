from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, auth
from app.database import get_db
from jose import jwt, JWTError

SECRET_KEY = "mysecretkey123"
ALGORITHM = "HS256"

router = APIRouter(prefix="/todos", tags=["Todos"])

def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/", response_model=list[schemas.TodoResponse])
def get_todos(token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    return db.query(models.Todo).filter(models.Todo.user_id == user.id).all()

@router.post("/", response_model=schemas.TodoResponse)
def create_todo(data: schemas.TodoCreate, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    todo = models.Todo(title=data.title, user_id=user.id)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

@router.put("/{todo_id}", response_model=schemas.TodoResponse)
def update_todo(todo_id: int, data: schemas.TodoCreate, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.user_id == user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo.title = data.title
    db.commit()
    db.refresh(todo)
    return todo

@router.delete("/{todo_id}")
def delete_todo(todo_id: int, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.user_id == user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted"}