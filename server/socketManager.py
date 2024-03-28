from fastapi import WebSocket, WebSocketDisconnect, File, UploadFile, Form
from server.application import fastApiServer


class SocketError(Exception):
    def __init__(self, detail: str):
        self.detail = detail

class SocketManager:
    def __init__(self):
        self.clients = {}
        self.routes = {}

    def addClient(self, ip: str, ws: WebSocket):
        self.clients[ip] = ws

    def removeClient(self, ip):
        if ip in self.clients[ip]:
            del self.clients[ip]

    def onSocket(self, func: callable, routeName: str):
        self.routes[routeName] = func

    async def _recieveMessage(self, routeName: str, data: dict):
        self.routes[routeName](data)

    async def sendMessage(self, routeName: str, data: dict, ip: str | None = None):
        try:
            if not (ip is None):
                if ip not in self.clients.keys():
                    raise SocketError("ip is not connected")

            sendData = {"routeName": routeName, "data": data}
            if not (ip is None):
                await self.clients[ip].send_json(sendData)
            else:
                for websocket in self.clients.values():
                    await websocket.send_json(sendData)
        except Exception as e:
            print('Exception:', e)


sockets = SocketManager()

@fastApiServer.websocket("/ws")
async def websocket_processing(websocket: WebSocket):
    await websocket.accept()
    client_ip = websocket.client.host
    sockets.addClient(client_ip, websocket)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        sockets.removeClient(client_ip)
    except Exception as e:
        print(e)

