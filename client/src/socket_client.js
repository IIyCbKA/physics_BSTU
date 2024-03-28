import { SERVER_ADR } from './server_files/server_connect';

const socket = new WebSocket('ws://' + SERVER_ADR + '/ws');

export {socket}
