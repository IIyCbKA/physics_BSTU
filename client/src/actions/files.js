import { SERVER, $host } from "../server_files/server_connect"
import {setFiles} from "../reducers/file_reducer";
import { saveAs } from 'file-saver';

export const getFilesName = (path) =>
    async (dispatch) => {
    try {
        const response = await $host.get(path);
        dispatch(setFiles(response.data.files));
    } catch (e) {
        console.log(e);
    }
};

export const uploadFile = async (file, dir_path) => {
    try{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('path', dir_path)
        const response = await $host.post('/api/add_file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    catch (e){
        console.log(e)
    }
}

export const downloadFile = async (fileName, fileID) => {
    const url = `${SERVER}/api/download/${fileID}`

    $host.get(url, {
        responseType: 'blob'
    }).then(response => {
        const blob = new Blob([response.data]);
        saveAs(blob, fileName);
    }).catch(e => console.log(e));
}


export const createFolder = async (folderName, path) => {
    try{
        await $host.post('/api/create_folder', {folderName, path})
    }
    catch(e){
        console.log(e)
    }
}


export const deleteFile = async (file_id) => {
    try{
        await $host.post('/api/delete_file', {fileID: file_id})
    }
    catch(e){
        console.log(e)
    }
}
