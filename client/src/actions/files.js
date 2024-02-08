import {$host} from "../routes";

const FormData = require('form-data')

export function uploadFile(file, dir_path) {
    const reader = new FileReader()
    reader.onload = async (event) => {
        const fileData = event.target.result
        try {
            await $host.post('/api/add_file', {
                file: fileData,
                path: dir_path,
                filename: file.name
            });
        } catch (error) {
            console.log(error);
        }
    }
    try {
        reader.readAsArrayBuffer(file)
    } catch(e) {
        console.log(e);
    }
}