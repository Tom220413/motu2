import bcrypt

async def hash_password(password: str) -> str:
    salt = bcrypt.gensalt(rouds=12)
    bashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return bashed_password.decode("utf-8")


async def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))
