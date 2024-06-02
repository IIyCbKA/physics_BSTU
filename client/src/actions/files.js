import { SERVER, $host } from "../server_files/server_connect"
import {setFiles} from "../reducers/file_reducer";
import { saveAs } from 'file-saver';
import {
    CREATE_DISK_FOLDER_URL, DELETE_DISK_FILE_URL,
    DOWNLOAD_DISK_FILE_PATTERN_URL,
    UPLOAD_DISK_FILE_URL
} from "../constants";

export const getFilesName = (path) =>
    async (dispatch) => {
    try {
        const response = await $host.get(path);
        dispatch(setFiles(response.data.files));

        return response.status
    } catch (e) {
        console.log(e);
        return e.response.status
    }
};

export const uploadFile = async (file, dir_path) => {
    try{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('path', dir_path)
        await $host.post(UPLOAD_DISK_FILE_URL, formData, {
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
    const url = `${SERVER}${DOWNLOAD_DISK_FILE_PATTERN_URL}${fileID}`

    $host.get(url, {
        responseType: 'blob'
    }).then(response => {
        const blob = new Blob([response.data]);
        saveAs(blob, fileName);
    }).catch(e => console.log(e));
}


export const createFolder = async (folderName, path) => {
    try{
        await $host.post(CREATE_DISK_FOLDER_URL, {folderName, path})
    }
    catch(e){
        console.log(e)
    }
}


export const deleteFile = async (file_id) => {
    try{
        await $host.post(DELETE_DISK_FILE_URL, {fileID: file_id})
    }
    catch(e){
        console.log(e)
    }
}
