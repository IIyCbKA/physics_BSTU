import Disk from "../../elements/disk/disk";
import React, {useCallback} from "react";
import {uploadFile} from "../../actions/files";
import {useDropzone} from "react-dropzone";
import {useSelector} from "react-redux";
import {socket} from "../../socket_client";
import {setFiles} from "../../reducers/file_reducer";
import {useDispatch} from "react-redux";
import './styles/style_storage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Storage(){
    const dispatch = useDispatch()
    const path = useSelector(state => state.file.path)

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => uploadFile(file, path));
    }, [path]);

    const {getRootProps, isDragActive} = useDropzone({onDrop, noClick: true})

    socket.onMessage('getFilesName', (data) => {
        dispatch(setFiles(data.files))
    })

    return (
        <div className="around-storage">
            <div { ...getRootProps()} className="storage">
                <Disk/>
                {isDragActive &&
                    <div className='drop-area'>
                        <div className='drop-frame'>
                            Загрузить файлы в хранилище
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}