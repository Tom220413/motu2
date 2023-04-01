from pydantic import BaseModel, Field


class TodosList(BaseModel):
    id: str = Field(title="ID", default=None)
    content: str = Field(..., title="内容")
    done: bool = Field(..., title="完了フラグ", example=False)

class deleteTodosList(BaseModel):
    id: str = Field(..., title="ID")
