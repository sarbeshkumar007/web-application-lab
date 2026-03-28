# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app import models, schemas, auth
# from app.database import get_db

# router = APIRouter(prefix="/auth", tags=["Auth"])

# @router.post("/register", response_model=schemas.UserResponse)
# def register(data: schemas.RegisterRequest, db: Session = Depends(get_db)):
#     existing = db.query(models.User).filter(models.User.email == data.email).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     user = models.User(
#         name=data.name,
#         email=data.email,
#         hashed_password=auth.hash_password(data.password)
#     )
#     db.add(user)
#     db.commit()
#     db.refresh(user)
#     return user

# @router.post("/login")
# def login(data: schemas.LoginRequest, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.email == data.email).first()
#     if not user or not auth.verify_password(data.password, user.hashed_password):
#         raise HTTPException(status_code=401, detail="Invalid email or password")
#     token = auth.create_token({"sub": str(user.id), "email": user.email})
#     return {"access_token": token, "token_type": "bearer", "user": {"id": user.id, "name": user.name}}


from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas, auth
from app.database import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

# ---------------------
# REGISTER NEW USER
# ---------------------
@router.post("/register", response_model=schemas.UserResponse)
def register(data: schemas.RegisterRequest, db: Session = Depends(get_db)):
    # Check if email already exists
    existing = db.query(models.User).filter(models.User.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash the password before storing
    hashed_pw = auth.hash_password(data.password)

    user = models.User(
        name=data.name,
        email=data.email,
        hashed_password=hashed_pw
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

# ---------------------
# LOGIN USER
# ---------------------
@router.post("/login")
def login(data: schemas.LoginRequest, db: Session = Depends(get_db)):
    # Fetch user by email
    user = db.query(models.User).filter(models.User.email == data.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Verify password
    if not auth.verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Create JWT token
    token = auth.create_token({"sub": str(user.id), "email": user.email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }