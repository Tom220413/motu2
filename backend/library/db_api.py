import traceback
from datetime import timedelta

from fastapi import APIRouter, Path, Query, Body, HTTPException
from starlette.responses import JSONResponse
from library.db import get_todos_list, upsert_todos_list, delete_todos_list, register, prefectures
from library.models import TodosList, deleteTodosList, User

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
        print("post_todos_list_api")
        await upsert_todos_list(dict(body))
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())

    return JSONResponse(status_code=200, content={"msg": "", "code": 0})


@router.put("/update/{item_id:str}", name="todoリストを更新する")
async def update_todos_list_api(item_id: str):
    param = {"id": item_id, "done": True}
    try:
        await upsert_todos_list(param)
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())
    return JSONResponse(status_code=200, content={"msg": "", "code": 0})


@router.delete("/delete/{item_id:str}", name="todoリストを削除する")
async def delete_todos_list_api(item_id: str):
    try:
        await delete_todos_list(item_id)
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())
    return JSONResponse(status_code=200, content={"msg": "", "code": 0})


@router.post("/register", name="ユーザー登録")
async def register_api(user: User):
    try:
        await register(user)
    except HTTPException as httpe:
        return JSONResponse(status_code=400, content=traceback.format_exc())
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())
    return JSONResponse(status_code=200, content={"msg": "", "code": 0})

@router.get("/prefectures", name="都道府県を取得")
async def get_prefectures():
    try:
        return await prefectures()
    except HTTPException as httpe:
        return JSONResponse(status_code=400, content=traceback.format_exc())
    except Exception as e:
        return JSONResponse(status_code=500, content=traceback.format_exc())
    return JSONResponse(status_code=200, content={"msg": "", "code": 0})