import Disk from "../../elements/disk/disk";
import React, {useCallback} from "react";
import {uploadFile} from "../../actions/files";
import {useDropzone} from "react-dropzone";
import {useSelector} from "react-redux";
import {socket} from "../../server_files/sockets/socket_client";
import {cleanSelectedInfo, setFiles} from "../../reducers/file_reducer";
import {useDispatch} from "react-redux";
import './styles/style_storage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {EMPLOYEE_USER_STATUS} from "../../constants";

const DROPZONE_TEXT = 'Загрузить файлы в хранилище'

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

    const rootProps = userStatus === EMPLOYEE_USER_STATUS ? getRootProps() : {};

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
                {isDragActive && userStatus === EMPLOYEE_USER_STATUS &&
                    <div className='drop-area'>
                        <div className='drop-frame'>
                            {DROPZONE_TEXT}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}