import io from 'socket.io-client';
import { SERVER } from './routes';

const socket = io(SERVER);

export {socket}
