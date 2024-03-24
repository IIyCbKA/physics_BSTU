import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';
import {uploadFile, getFilesName} from '../actions/files'
import React, {useCallback, useEffect} from "react";
import '../styles/style.css'
import {useDropzone} from 'react-dropzone'
import { createSocket } from '../socket_client';
import {useLocation} from 'react-router-dom';
import File from "../elements/disk/file";
import {setFiles} from "../reducers/file_reducer";
import {useDispatch, useSelector} from "react-redux";

function Home() {
    const dispatch = useDispatch()
    const files = useSelector(state => state.file.files)

    const location = useLocation();
    const path = location.pathname.endsWith('/') ? location.pathname:
        location.pathname + '/';

    useEffect(() => {
        getFilesName(path)
            .then(result => {
                dispatch(setFiles(result.files))
                console.log(result)
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, [path]);

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
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
            <div {...getRootProps()} className="storage">
                <input {...getInputProps()} />
                <div className='storage-main'>
                    <div className="root-content-inner">
                        <div className="root-content-container">
                            <div className="client-listing">
                                <div className="listing-items">
                                    {files.map(file => (
                                        <File name={file.name}
                                              type={file.type}
                                              key={file.id}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isDragActive &&
                    <div className='drop-area'>
                        <div className='drop-frame'>
                            Загрузить файлы в хранилище
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Home;
