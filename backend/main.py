import traceback
import os

from fastapi import FastAPI, Request, APIRouter, Path, Query
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from library import db_api


app = FastAPI()

app.include_router(db_api.router)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="SECRET")


@app.get("/api")
async def root(request: Request):
    print(request.headers)
    return {"message": "Hello World"}


@app.get("/no-proxy-header")
async def noProxyHeader(request: Request):
    print(request.headers)
    return {"message": "no proxy header"}
