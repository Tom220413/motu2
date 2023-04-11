from fastapi import APIRouter, Path, Query, Body, HTTPException, Depends
from starlette.responses import JSONResponse

router = APIRouter(prefix=f"/user", tags=["user"])


@router.post("/login", name="ログイン")
async def login(username: str, passcord: str, session: dict = Depends(get_session)):
