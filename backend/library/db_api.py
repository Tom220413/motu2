import traceback
from datetime import timedelta

from fastapi import APIRouter, Path, Query, Body
from starlette.responses import JSONResponse
from library.db import get_todos_list, upsert_todos_list
from library.models import TodosList, deleteTodosList

# logger = tools.get_logger(__name__)

router = APIRouter(prefix=f"/db", tags=["db"])


@router.get("/list", name="todoリストを取得する")
async def get_todos_list_api():
    try:
        result = await get_todos_list()
        return result
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())


@router.post("/post", name="todoリスト追加する")
async def post_todos_list_api(
    body: TodosList = Body(..., description="パラメータ必須"),
):
    try:
        await upsert_todos_list(dict(body))
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())

    return JSONResponse(status_code=200, content={"msg": "", "code": 0})


@router.delete("/delete", name="todoリストを削除する")
async def delete_todos_list_api(
    body: deleteTodosList = Body(..., description="パラメータ必須"),
):
    try:
        await delete_todos_list(dict(body))
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())
    return JSONResponse(status_code=200, content={"msg": "", "code": 0})
