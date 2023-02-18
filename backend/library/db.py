import os
from pymongo import MongoClient, ASCENDING, DESCENDING, UpdateOne, DeleteOne, UpdateMany
from typing import Optional


class DBClient:
    def __init__(self) -> None:
        db_host = os.environ.get("DB_HOST", "mongo")
        db_user = os.environ.get("MONGO_DATABASE_USER", "root")
        db_password = os.environ.get("MONGO_DATABASE_PASSWORD", "dummy")
        db_port = os.environ.get("DB_PORT", "27017")

        db_param = os.environ.get(
            "OPS_DB_PARAM",
            f"?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
        )
        self.conn = MongoClient(
            f"mongodb://{db_user}:{db_password}@{db_host}:{db_port}",
            tz_aware=True,
        )
        db = self.get_db()

    def get_db(self):
        env = os.environ.get("ENV_NAME")
        if env is None:
            return self.conn.test1
        return self.conn[f"{env}"]


mongo_client: Optional[DBClient] = None


async def get_db_client() -> DBClient:
    global mongo_client
    mongo_client = DBClient()
    return mongo_client


async def get_db():
    db_client = await get_db_client()
    return db_client.get_db()


async def get_todos_list():
    try:
        print("get_todos_list")
        db = await get_db()
        result = []
        rows = db.todos.find()
        for row in rows:
            result.append(
                {
                    "id": row["id"],
                    "content": row["content"],
                    "done": row["done"],
                }
            )
        return result
    except Exception as e:
        print(e)
        return e
