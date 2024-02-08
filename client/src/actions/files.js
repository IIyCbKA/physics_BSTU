import {socket} from '../socket_client'
import {$host} from "../routes";

const FormData = require('form-data')

export function uploadFile(file, dir_path) {
    const reader = new FileReader()
    reader.onload = (event) => {
        const fileData = event.target.result
        socket.emit('add_file', {
            'file': fileData,
            'path': dir_path,
            'filename': file.name
        })
    }
    try {
        reader.readAsArrayBuffer(file)
    } catch(e) {
        console.log(e);
    }
}