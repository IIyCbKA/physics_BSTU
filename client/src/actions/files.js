import { SERVER } from "../routes"

export const uploadFile = async (file, dir_path) => {
    try{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('path', dir_path)
        formData.append('filename', file.name)
        console.log('FormData', formData)
        const response = await fetch(SERVER + '/api/add_file', 
            {method: 'POST', body: formData})
        console.log(response)
    }
    catch (e){
        console.log(e)
    }
}