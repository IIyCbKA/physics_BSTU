import { SERVER_ADR } from '../server_files/server_connect';

class SocketManager{
    constructor(address) {
        this.routes = {}
        this.address = address
    }

    onMessage (routeName, routeFunc){
        this.routes[routeName] = routeFunc
    }
}

const socket = new SocketManager('ws://' + SERVER_ADR + '/ws');

const wsocket = new WebSocket(socket.address)

wsocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    socket.routes[data.routeName](data.data)
}

export {socket}
