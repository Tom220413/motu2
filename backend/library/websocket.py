from fastapi import FastAPI, WebSocket

app = FastAPI()

#とりあえず、チュートリアル的なものを実装してみただけ。
#実施はどうやるのか・・・
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")