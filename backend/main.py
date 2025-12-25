from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import json
from pathlib import Path

from database import SessionLocal, engine, Base
from models import User, TestResult
from schemas import LoginRequest, SignupRequest, TestResultCreate
from auth import verify_password, create_token, hash_password, decode_token

# ================= APP =================
app = FastAPI(title="Neurovia Backend")

# ================= SECURITY =================
security = HTTPBearer()

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= DATABASE =================
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ================= ROUTES =================

@app.get("/")
def root():
    return {"status": "Backend running"}

# ---------- SIGNUP ----------
@app.post("/signup")
def signup(user: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user.email,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}

# ---------- LOGIN ----------
@app.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(db_user.email)
    return {"access_token": token}

# ---------- MEMORY TEST ----------
@app.get("/tests/memory")
def get_memory_test():
    file_path = Path("datasets/memory.json")

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Memory dataset not found")

    with open(file_path, "r") as f:
        data = json.load(f)

    return data

# ---------- SAVE TEST RESULT ----------
@app.post("/results")
def save_result(
    result: TestResultCreate,
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    email = decode_token(token)

    if not email:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    new_result = TestResult(
        user_email=email,
        test_type=result.test_type,
        score=result.score,
        total=result.total
    )

    db.add(new_result)
    db.commit()
    db.refresh(new_result)

    return {"message": "Result saved successfully"}

# ---------- GET RESULTS ----------
@app.get("/results")
def get_results(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    email = decode_token(token)

    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    results = db.query(TestResult).filter(
        TestResult.user_email == email
    ).all()

    return results
@app.get("/tests/reasoning")
def get_reasoning_test():
    file_path = Path("datasets/reasoning.json")

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Reasoning dataset not found")

    with open(file_path, "r") as f:
        data = json.load(f)

    return data

@app.get("/tests/attention")
def get_attention_test():
    file_path = Path("datasets/attention.json")
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Attention dataset not found")
    with open(file_path, "r") as f:
        return json.load(f)


