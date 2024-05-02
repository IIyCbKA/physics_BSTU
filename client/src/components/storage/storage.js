import Disk from "../../elements/disk/disk";
import React, {useCallback} from "react";
import {uploadFile} from "../../actions/files";
import {useDropzone} from "react-dropzone";
import {useSelector} from "react-redux";
import {socket} from "../../classes/socket_client";
import {cleanSelectedInfo, setFiles} from "../../reducers/file_reducer";
import {employeeStatus} from "../../reducers/user_reducer";
import {useDispatch} from "react-redux";
import './styles/style_storage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {setTasks} from "../../reducers/journal_reducer";

export default function Storage(props){
    const dispatch = useDispatch()
    const path = useSelector(state => state.file.path)
    const userStatus = useSelector(state => state.user.currentUser.status)
    const selected_id = useSelector(state => state.file.selected_id)

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => uploadFile(file, path));
    }, [path]);

    const {getRootProps, isDragActive} = useDropzone({onDrop, noClick: true})

    socket.onMessage('getFilesName', (data) => {
        dispatch(setFiles(data.files))
    })

    socket.onMessage('getTasksList', (data) => {
        dispatch(setTasks(data))
    })

    const rootProps = userStatus === employeeStatus ? getRootProps() : {};

    const handlerClick = () => {
        if (selected_id !== null){
            dispatch(cleanSelectedInfo());
        }
    }

    return (
        <div className="around-storage"
            onClick={handlerClick}
        >
            <div {...rootProps} className="storage">
                <Disk orientation={props.orientation}/>
                {isDragActive && userStatus === employeeStatus &&
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