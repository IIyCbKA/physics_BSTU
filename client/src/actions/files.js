import { SERVER, $host } from "../server_files/server_connect"
import {setFiles} from "../reducers/file_reducer";

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
        });
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
        return response.data;
    }).then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }).catch(e => console.log(e));
}


export const deleteFile = async (file_id) => {
    try{
        await $host.post('/api/delete_file', {fileID: file_id})
    }
    catch(e){
        console.log(e)
    }
}
