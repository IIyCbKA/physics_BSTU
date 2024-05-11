import { SERVER_ADR } from '../server_connect';

class SocketManager{
    constructor(address, ws) {
        this.routes = {}
        this.address = address
        this.ws = ws
    }

    onMessage (routeName, routeFunc){
        this.routes[routeName] = routeFunc
    }

    async init (routeName, data) {
        const token = localStorage.getItem('token')
        this.ws.send(JSON.stringify({routeName, token, data}))
    }
}

const address = 'ws://' + SERVER_ADR + '/ws'

const wsocket = new WebSocket(address)

const socket = new SocketManager(address, wsocket);

wsocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    socket.routes[data.routeName](data.data)
}

// Реализовать позже переподключение при смене сети
// const reconnect = async () => {
//
// }

// wsocket.onclose = (event) => {
//
// }

console.log('socket url:', wsocket.url);

export {socket}
