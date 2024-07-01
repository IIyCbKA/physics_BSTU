import json

from fastapi import WebSocket, WebSocketDisconnect
from src.application import fastApiServer
from src.data.functions.journal import getStudentGroupID
from functools import wraps
from jose import ExpiredSignatureError
from uuid import uuid4


class SocketError(Exception):
    def __init__(self, detail: str):
        self.detail = detail


class SocketInfo:
    def __init__(self, ws: WebSocket, socketID: str, userID: int = None):
        self.socketID = socketID
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

    def addRoom(self, ws: WebSocket, room: str, socketID: str):
        if room not in self.rooms.keys():
            self.rooms[room] = {}

        self.rooms[room][socketID] = ws
        self.sockets[socketID].rooms.add(room)

        self.rooms[room][socketID] = ws

    def addSocket(self, ws: WebSocket, socketID: str, room: str | None = None):
        if socketID not in self.sockets:
            self.sockets[socketID] = SocketInfo(ws, socketID, self.userID)
            self.addRoom(ws, self.statusRoomName, socketID)

        if room is not None:
            self.addRoom(ws, room, socketID)

    # удаляет сокет
    def delSocket(self, ws: WebSocket, socketID: str):
        if socketID in self.sockets.keys():
            for room in list(self.sockets[socketID].rooms):
                del self.rooms[room][socketID]
                self.sockets[socketID].rooms.remove(room)
            del self.sockets[socketID]

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

    def addInRoom(self, socketID: str, room: str, ws: WebSocket | None = None):
        if ws is None:
            ws = self.getWS(socketID)
        if room not in self.rooms.keys():
            self.rooms[room] = {}
        self.rooms[room][socketID] = ws


    def addSocketEmployeeGroup(self, userID: int, status: str, socketID: str,
                               group_id: int):
        self.addSocketRoute(userID, status, socketID, f'eg{group_id}')


    def addClient(self, userID: int, status: str):
        user = ClientInfo(userID, status)
        self.clients[userID] = user

    def removeClient(self, userID: int):
        del self.clients[userID]

    def getWS(self, socketID: str):
        return self.sockets[socketID].ws

    def addSocket(self, ws: WebSocket) -> str:
        socketID = str(uuid4())
        self.sockets[socketID] = SocketInfo(ws, socketID)
        return socketID

    def addSocketRoute(self, userID: int, status: str, socketID: str,
                       room: str | None = None):
        ws = self.getWS(socketID)
        if socketID not in self.sockets.keys():
            raise SocketError('Socket with this id is not found')

        self.sockets[socketID].userID = userID
        if userID not in self.clients.keys():
            self.addClient(userID, status)

        user = self.clients[userID]
        if user.statusRoomName not in self.sockets[socketID].rooms:
            self.clients[userID].addSocket(ws, socketID, user.statusRoomName)
            self.addInRoom(socketID, user.statusRoomName, ws)
            self.sockets[socketID].rooms.add(user.statusRoomName)
        if room is not None:
            self.clients[userID].addSocket(ws, socketID, room)
            self.addInRoom(socketID, room, ws)
            self.sockets[socketID].rooms.add(room)

    def removeSocket(self, socketID: str):
        ws = self.getWS(socketID)
        if socketID in self.sockets.keys():
            userID = self.sockets[socketID].userID
            for room in self.sockets[socketID].rooms:
                del self.rooms[room][socketID]
            self.clients[userID].delSocket(ws, socketID)
            del self.sockets[socketID]
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

    async def receiveMessage(self, socketID: str, routeName: str,
                             token: str, data: dict):
        await self.routes[routeName](socketID, token, data)

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


    @staticmethod
    async def sendMessageWS(routeName: str, data: dict, ws: WebSocket):
        try:
            sendData = {"routeName": routeName, "data": data}
            await ws.send_json(sendData)
        except Exception as e:
            print('Exception:', e)

    async def sendMessageSocketID(self, routeName: str,
                                  data: dict, socketID: str):
        ws = self.getWS(socketID)
        await self.sendMessageWS(routeName, data, ws)


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
    socketID = sockets.addSocket(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            if data is not None:
                info = json.loads(data)
                try:
                    await sockets.receiveMessage(socketID,
                                                 info['routeName'],
                                                 info['token'],
                                                 info['data'])
                except ExpiredSignatureError:
                    await SocketManager.sendMessageWS(
                        'refresh', info['data'], websocket)
    except WebSocketDisconnect:
        sockets.removeSocket(socketID)
    except Exception as e:
        print(e)

