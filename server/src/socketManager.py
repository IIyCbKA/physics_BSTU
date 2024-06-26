import json

from fastapi import WebSocket, WebSocketDisconnect
from src.application import fastApiServer
from src.data.functions.journal import getStudentGroupID
from functools import wraps


class SocketError(Exception):
    def __init__(self, detail: str):
        self.detail = detail


def getFullAddr(ws: WebSocket):
    return ws.client.host + ':' + str(ws.client.port)


class SocketInfo:
    def __init__(self, ws: WebSocket, userID: int):
        self.ws: WebSocket = ws
        self.userID = userID
        self.rooms: set[str] = set()


# информация о клиенте
class ClientInfo:
    def __init__(self, userID: int, status: str):
        self.userID = userID                  # id пользователя
        self.status = status                    # статус пользователя
        self.sockets: dict[str, SocketInfo] = {}    # сокеты пользователя
        # распределённые по комнатам сокеты
        self.rooms: dict[str, dict[str, WebSocket]] = {}
        self.statusRoomName = ''
        if status == 'student':
            self.group_id = getStudentGroupID(userID)
            self.statusRoomName = 'g' + str(self.group_id)
        elif status == 'employee':
            self.statusRoomName = 'employee'

        # запись о комнатах отобразилась только в ClientInfo
        # позже нужно добавить сокет во все комнаты

    def addRoom(self, ws: WebSocket, room: str, addr: str = None):
        if addr is None:
            addr = getFullAddr(ws)

        if room not in self.rooms.keys():
            self.rooms[room] = {}

        self.rooms[room][addr] = ws
        self.sockets[addr].rooms.add(room)

        self.rooms[room][addr] = ws

    def addSocket(self, ws: WebSocket, room: str | None = None):
        addr = getFullAddr(ws)

        if addr not in self.sockets:
            self.sockets[addr] = SocketInfo(ws, self.userID)
            self.addRoom(ws, self.statusRoomName, addr)

        if room is not None:
            self.addRoom(ws, room, addr)

    # удаляет сокет
    def delSocket(self, ws: WebSocket):
        addr = getFullAddr(ws)
        if addr in self.sockets.keys():
            for room in list(self.sockets[addr].rooms):
                del self.rooms[room][addr]
                self.sockets[addr].rooms.remove(room)
            del self.sockets[getFullAddr(ws)]

    async def sendData(self, data: dict, room: str):
        for ws in self.rooms[room].values():
            await ws.send_json(data)

    def wsAmount(self):
        return len(self.sockets)


class SocketManager:
    def __init__(self):
        self.clients: dict[int, ClientInfo] = {}
        self.sockets: dict[str, SocketInfo] = {}
        self.rooms: dict[str, dict[str, WebSocket]] = {}
        self.routes = {}

    def addInRoom(self, ws: WebSocket, room: str, addr: str | None = None):
        if addr is None:
            addr = getFullAddr(ws)
        if room not in self.rooms.keys():
            self.rooms[room] = {}
        self.rooms[room][addr] = ws


    def addSocketEmployeeGroup(self, userID: int, status: str, ws: WebSocket,
                               group_id: int):
        self.addSocket(userID, status, ws, f'eg{group_id}')


    def addClient(self, userID: int, status: str):
        user = ClientInfo(userID, status)
        self.clients[userID] = user

    def removeClient(self, userID: int):
        del self.clients[userID]

    def addSocket(self, userID: int, status: str,
                  ws: WebSocket, room: str | None = None):
        addr = getFullAddr(ws)
        if addr not in self.sockets.keys():
            self.sockets[addr] = SocketInfo(ws, userID)
        else:
            self.sockets[addr].ws = ws
        if userID not in self.clients.keys():
            self.addClient(userID, status)

        user = self.clients[userID]
        if user.statusRoomName not in self.sockets[addr].rooms:
            self.clients[userID].addSocket(ws, user.statusRoomName)
            self.addInRoom(ws, user.statusRoomName, addr)
            self.sockets[addr].rooms.add(user.statusRoomName)
        if room is not None:
            self.clients[userID].addSocket(ws, room)
            self.addInRoom(ws, room, addr)
            self.sockets[addr].rooms.add(room)

    def removeSocket(self, ws: WebSocket):
        addr = getFullAddr(ws)
        if addr in self.sockets.keys():
            userID = self.sockets[addr].userID
            for room in self.sockets[addr].rooms:
                del self.rooms[room][addr]
            self.clients[userID].delSocket(ws)
            if self.clients[userID].wsAmount() == 0:
                del self.clients[userID]

    def onSocket(self, routeName: str):
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                return func

            self.routes[routeName] = func
            return wrapper

        return decorator

    async def receiveMessage(self, ws: WebSocket, routeName: str,
                             token: str, data: dict):
        await self.routes[routeName](ws, token, data)

    async def sendMessageToUser(self, routeName: str, data: dict,
                                room: str, userID: int):
        try:
            if userID not in self.clients.keys():
                raise SocketError("user is not connected")
            sendData = {"routeName": routeName, "data": data}
            await self.clients[userID].sendData(sendData, room)

        except Exception as e:
            print('Exception:', e)

    async def sendMessageRoom(self, routeName: str, data: dict, room: str):
        try:
            sendData = {"routeName": routeName, "data": data}
            if room in self.rooms.keys():
                for info in self.rooms[room].values():
                    await info.send_json(sendData)
        except Exception as e:
            print('Exception:', e)

    async def sendMessageRooms(self, routeName: str, data: dict,
                               rooms: list[str]):
        for room in rooms:
            await self.sendMessageRoom(routeName, data, room)

    async def sendMessageGroups(self, routeName: str, data: dict,
                                groups: list[int]):
        await self.sendMessageRooms(routeName, data, list(map(
            lambda gr: 'g' + str(gr), groups)))

    async def sendMessageEmployeeGroup(self, routeName: str, data: dict,
                                       group_id: int):
        await self.sendMessageRoom(routeName, data, f'eg{group_id}')


    async def sendMessageEmpoyees(self, routeName: str, data: dict):
        await self.sendMessageRoom(routeName, data, 'employee')


sockets = SocketManager()


@fastApiServer.websocket("/ws")
async def websocket_processing(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_text()
            if data is not None:
                info = json.loads(data)
                await sockets.receiveMessage(websocket,
                                             info['routeName'],
                                             info['token'],
                                             info['data'])
    except WebSocketDisconnect:
        sockets.removeSocket(websocket)
    except Exception as e:
        print(e)

