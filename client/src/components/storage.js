import Disk from "../elements/disk/disk";
import React, {useCallback} from "react";
import {uploadFile} from "../actions/files";
import {useDropzone} from "react-dropzone";
import {useSelector} from "react-redux";
import {createSocket} from "../socket_client";
import {setFiles} from "../reducers/file_reducer";
import {useDispatch} from "react-redux";
import '../styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Storage(){
    const dispatch = useDispatch()
    const path = useSelector(state => state.file.path)
    console.log(path)

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => uploadFile(file, path));
    }, [path]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const socket = createSocket()

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        dispatch(setFiles(data.files))
        console.log(data)
    }

    return (
        <div {...getRootProps()} className="storage">
            <input {...getInputProps()} />
            <Disk/>
            {isDragActive &&
                <div className='drop-area'>
                    <div className='drop-frame'>
                        Загрузить файлы в хранилище
                    </div>
                </div>
            }
        </div>
    )
}