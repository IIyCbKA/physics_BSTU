import { SERVER, $host } from "../routes"

export const getFilesName = async (path) => {
    try{
        await $host.get('/api/get_files' , {params: {path}})
    }
    catch (e){
        console.log(e)
    }
}

export const uploadFile = async (file, dir_path) => {
    try{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('path', dir_path)
        const response = await fetch(SERVER + '/api/add_file', 
            {
                method: 'POST', 
                body: formData})
        console.log(response)
    }
    catch (e){
        console.log(e)
    }
}

export const downloadFile = async (filename, dir_path) => {
    const params = new URLSearchParams();
    params.append('filename', filename);
    params.append('path', dir_path);

    const url = `${SERVER}/api/file_download_request?${params.toString()}`;

    fetch(url, {
        method: 'GET',
        responseType: 'blob'
    }).then(response => {
        return response.blob();
    }).then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }).catch(e => console.log(e));
}

export const deleteFile = async (filename, dir_path) => {
    try{
        await $host.post('/api/delete_file', {filename, path: dir_path})
    }
    catch(e){
        console.log(e)
    }
}
