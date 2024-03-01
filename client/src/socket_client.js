import { SERVER_ADR } from './routes';

const createSocket = () => new WebSocket('ws://' + SERVER_ADR + '/ws');

export {createSocket}
