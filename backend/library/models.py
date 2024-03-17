from pydantic import BaseModel, Field
from typing import Optional


class TodosList(BaseModel):
    id: str = Field(title="ID", default=None)
    content: str = Field(..., title="内容")
    done: bool = Field(..., title="完了フラグ", example=False)


class deleteTodosList(BaseModel):
    id: str = Field(..., title="ID")


class User(BaseModel):
    usernamr: str = Field(
        ...,
        title="Username",
    )
    email: str = Field(
        ..., title="Email", regex="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    )
    password: str = Field(..., title="Password", regex="^(?=.*\d)[a-zA-Z\d]{8,}$")


class PutProfile(BaseModel):
    username: Optional[str] = Field(
        ...,
        title="Username",
    )
    bio: Optional[str] = Field(
        None, 
        title="自己紹介",
        max_length=200,
    )
    gender: Optional[int] = Field(..., title="性別(0:未回答,1:男性,2:女性)", ge=0, le=2)
    email: str = Field(
        ..., title="Email", regex="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    )
