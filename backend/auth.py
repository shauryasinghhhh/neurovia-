from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

# ================= JWT CONFIG =================
SECRET_KEY = "neurovia_secret_key"
ALGORITHM = "HS256"

# ================= PASSWORD HASHING =================
pwd_context = CryptContext(
    schemes=["argon2"],
    argon2__time_cost=1,
    argon2__memory_cost=10240,  # 10 MB
    argon2__parallelism=2,
    deprecated="auto"
)

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

# ================= JWT FUNCTIONS =================
def create_token(email: str):
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(hours=1),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")  # email
    except:
        return None
