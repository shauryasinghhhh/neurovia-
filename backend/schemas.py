from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class SignupRequest(BaseModel):
    email: EmailStr
    password: str
class TestResultCreate(BaseModel):
    test_type: str
    score: int
    total: int
