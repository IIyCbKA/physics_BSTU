import { SERVER_ADR } from './server_files/server_connect';

const createSocket = () => new WebSocket('ws://' + SERVER_ADR + '/ws');

export {createSocket}
