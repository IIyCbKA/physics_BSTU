from fastapi import WebSocket, WebSocketDisconnect
from src.application import fastApiServer


class SocketError(Exception):
    def __init__(self, detail: str):
        self.detail = detail


class ClientInfo:
    def __init__(self, ws: WebSocket | None, path: str | None = None):
        self.ws = ws
        self.path = path


class SocketManager:
    def __init__(self):
        self.clients: dict[str, ClientInfo] = {}
        self.paths: dict[str, dict[str, ClientInfo]] = {}
        self.routes = {}

    def addClient(self, ip: str, ws: WebSocket):
        if ip in self.clients.keys():
            self.clients[ip].ws = ws
        else:
            self.clients[ip] = ClientInfo(ws)

    def addPath(self, ip: str, path: str):
        if ip in self.clients.keys():
            self.clients[ip].path = path
        else:
            self.clients[ip] = ClientInfo(None, path)

        if not (path in self.paths.keys()):
            self.paths[path] = {}

        self.paths[path][ip] = self.clients[ip]

    def removeClient(self, ip):
        if ip in self.clients[ip]:
            path = self.clients[ip].path
            if path:
                if ip in self.paths[path][ip]:
                    del self.paths[path][ip]
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
                if not (self.clients[ip].ws is None):
                    await self.clients[ip].ws.send_json(sendData)
            else:
                for info in self.clients.values():
                    if not (info.ws is None):
                        await (info.ws.send_json(sendData))
        except Exception as e:
            print('Exception:', e)

    async def sendMessagePath(self, routeName: str, data: dict, path: str):
        try:
            sendData = {"routeName": routeName, "data": data}
            for info in self.paths[path].values():
                if not (info.ws is None):
                    await (info.ws.send_json(sendData))
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

