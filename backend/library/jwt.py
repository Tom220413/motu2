from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt

app = FastAPI()

# 適切なアルゴリズムとキーを使用して、トークンを生成するために必要な設定
SECRET_KEY = "my_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# パスワードのハッシュ化
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# テスト用のユーザー情報
fake_users_db = {
    "john.doe@example.com": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "hashed_password": "$2b$12$pX9tVWmZ8q3L3MztlwPn7OtndyPNl3qjOmnOaFrXytavcduZlv8Je",
        "disabled": False,
    }
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# パスワードの検証
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# ユーザーの取得
def get_user(email: str):
    if email in users:
        user_dict = users[email]
        return user_dict


# パスワードの検証とユーザー取得
def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


# トークンの作成
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
