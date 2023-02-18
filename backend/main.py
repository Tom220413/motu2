import traceback
import os

from fastapi import FastAPI, Request, APIRouter, Path, Query
from starlette.responses import JSONResponse

from library import db_api

app = FastAPI()

app.include_router(db_api.router)


@app.get("/api")
async def root(request: Request):
    print(request.headers)
    return {"message": "Hello World"}


@app.get("/no-proxy-header")
async def noProxyHeader(request: Request):
    print(request.headers)
    return {"message": "no proxy header"}
