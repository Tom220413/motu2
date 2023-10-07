import os
from pymongo import MongoClient, ASCENDING, DESCENDING, UpdateOne, DeleteOne, UpdateMany
from typing import Optional
from bson.objectid import ObjectId
from library.models import User
import library.hash
import urllib.parse


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
            return self.conn.motu2
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
        print("error get_todos_list")
        print(e)
        return e


async def upsert_todos_list(param: dict):
    try:
        print("upsert_todos_list")
        db = await get_db()
        result = db.todos.find_one({"id": param["id"]})
        if result is None:
            db.todos.insert(param)
        else:
            db.todos.update_one(
                filter={"id": result["id"]},
                update={"$set": {"done": param["done"]}},
                upsert=True,
            )
    except Exception as e:
        print("error post_todos_list")
        print(e)
        return e


async def delete_todos_list(param: str):
    try:
        print("delete_todos_list")
        db = await get_db()
        result = db.todos.find_one({"id": param})
        if result.count() == 0:
            raise Exception()
        else:
            db.todos.deleteOne({"id": param})
            return True
    except Exception as e:
        print(e)
        return False


async def register(param: User):
    try:
        print("register user")
        db = await get_db()
        if db.users.find_one({"username": param.username}):
            return False
        if db.users.find_one({"email": param.email}):
            return False
        # パスワードのハッシュ化
        await hash.hash_password(param.password)
        db.users.insert_one(param.dict())
        return True
    except Exception as e:
        print(e)
        return False


async def prefectures():
    print("prefectures starting")
    try:
        db = await get_db()
        result = []
        res = db.prefecture.find().sort([("id", 1)])
        if res:
            for i in res:
                result.append({"id": i["id"], "name": i["name"]})
            return result
        else:
            return {}
    except Exception as e:
        print(e)
        return False


async def get_search(q: str, location: str):
    print("get_search starting")
    try:
        result = []
        db = await get_db()
        res_filter = {}
        print(q)
        print(location)
        if location == "[null]":
            location = None
        if q:
            q = urllib.parse.unquote(q)
            res_filter.update(
                {
                    "$or": [
                        {"name": {"$regex": f"{q}"}},
                        {"namekana": {"$regex": f"{q}"}},
                        {"description": {"$regex": f"{q}"}},
                        {"address": {"$regex": f"{q}"}},
                    ]
                }
            )
        if location:
            location = urllib.parse.unquote(location)
            res_filter.update({"address": {"$regex": f"{location}"}})
        res = db.store.find(res_filter).sort([("id", 1)])
        for r in res:
            print(r)
            result.append(
                {
                    "id": r.get("id"),
                    "name": r.get("name"),
                    "namekana": r.get("namekana"),
                    "description": r.get("description"),
                    "address": r.get("address"),
                    "phone_number": r.get("phone_number"),
                    "email": r.get("email"),
                    "photos": r.get("photos"),
                }
            )
        return result
    except Exception as e:
        print(f"error {e}")
        return None


async def get_store(id: str):
    print("get_store starting")
    try:
        result = []
        db = await get_db()
        res = db.store.find_one({"id": int(id)})
        result.append(
            {
                "id": res.get("id"),
                "name": res.get("name"),
                "namekana": res.get("namekana"),
                "description": res.get("description"),
                "address": res.get("address"),
                "latitude": res.get("latitude"),
                "longitude": res.get("longitude"),
                "phone_number": res.get("phone_number"),
                "email": res.get("email"),
                "photos": res.get("photos"),
                "opening_hours": res.get("opening_hours"),
                "regular_holiday": res.get("regular_holiday"),
                "photos": res.get("photos"),
            }
        )
        return result
    except Exception as e:
        print(f"error {e}")
        return None

async def get_ranking():
    print("get_rankign start")
    try:
        result = []
        db = await get_db()
        res = db.review.find()
        for i in res:
            result.append(
                {
                    "storeId": i.get("storeId"),
                    "menu": i.get("menu"),
                    "soup": i.get("soup"),
                    "shime": i.get("shime"),
                    "image": i.get("image"),
                    "comment": i.get("comment"),
                }
            )
        return result
    except Exception as e:
        print(f"error {e}")
        return None