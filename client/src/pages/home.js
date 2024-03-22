import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';
import {uploadFile, getFilesName} from '../actions/files'
import React, {useCallback, useEffect, useState} from "react";
import '../styles/style.css'
import {useDropzone} from 'react-dropzone'
import { createSocket } from '../socket_client';
import {useLocation} from 'react-router-dom';
import File from "../elements/disk/file";


function Home() {
    // Список строк с именами файлов и директорий по текущему пути
    const [dirsName, setDirsName] = useState([])
    const [filesName, setFilesName] = useState([])
    // для тестирования
    const fileList = ['17.docx', '18.docx'].map(fileName => <File name={fileName} type={'docx'} key={fileName}/>)

    const location = useLocation();
    const path = location.pathname.endsWith('/') ? location.pathname:
        location.pathname + '/';

    useEffect(() => {
        getFilesName(path)
            .then(result => {
                setFilesName(result.files);
                setDirsName(result.dirs);
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
        setFilesName(data.files)
        setDirsName(data.dirs)
        console.log(data)
    }

    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='storage-main'>
                    {fileList}
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
