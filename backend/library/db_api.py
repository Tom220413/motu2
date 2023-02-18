import traceback
from datetime import timedelta

from fastapi import APIRouter, Path, Query
from starlette.responses import JSONResponse
from library.db import get_todos_list

# logger = tools.get_logger(__name__)

router = APIRouter(prefix=f"/db", tags=["db"])


@router.get("/list", name="todoリストを取得する")
async def get_todos_list_api():
    try:
        result = await get_todos_list()
        return result
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())
