import { SERVER_ADR } from "../server_connect";
import ReconnectingWebSocket from 'reconnecting-websocket';

class SocketManager {
  constructor(address, ws) {
    this.routes = {};
    this.address = address;
    this.ws = ws;
    this.initSockets = []
  }

  onMessage(routeName, routeFunc) {
    this.routes[routeName] = routeFunc;
  }

  async init(routeName, data) {
    this.initSockets.push({routeName, data})
    this.send(routeName, data)
  }

  async send(routeName, data) {
    const token = localStorage.getItem("token");
    this.ws.send(JSON.stringify({ routeName, token, data}));
  }

  async reconnect() {
    this.initSockets.map(socket => this.send(socket.routeName, socket.data))
  }
}

const address = "ws://" + SERVER_ADR + "/ws";

const options = {
  maxRetries: 20,
  minReconnectionDelay: 0,
  maxReconnectionDelay: 800,
  reconnectionDelayGrowFactor: 1.2,
};

const wsocket = new ReconnectingWebSocket(address, [], options);

const socket = new SocketManager(address, wsocket);

wsocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  socket.routes[data.routeName](data.data);
};

wsocket.onopen = () => {
  if (socket)
    socket.reconnect();
};

// Реализовать позже переподключение при смене сети
// const reconnect = async () => {
//
// }

wsocket.onclose = () => {
  // Настроим задержку для последующих переподключений
  wsocket._minReconnectionDelay = 100;
  wsocket._maxReconnectionDelay = 800;
};

console.log("socket url:", wsocket.url);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && wsocket.readyState !== WebSocket.OPEN) {
    wsocket.reconnect();
  }
});

export { socket };
