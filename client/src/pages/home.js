import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';
import {uploadFile, downloadFile, deleteFile, getFilesName} from '../actions/files'
import {useCallback, useEffect, useState} from "react";
import '../styles/style.css'
import {useDropzone} from 'react-dropzone'
import { createSocket } from '../socket_client';

function Home() {
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => uploadFile(file, '/'));
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    // Список строк с именами файлов по текущему пути
    const [filesName, setFilesName] = useState([])
    // Список имён вложенных директорий 
    const [directoriesPath, setDirectoriesPath] = useState([])

    const socket = createSocket()

    socket.onmessage = (event) => {
        setFilesName(JSON.parse(event.data))
    }

    // Получает список файлов при загрузке страницы
    useEffect(() => {
        //socket.send('')
        
    }, [])

    // Выводит в консоль список файлов при его изменении
    // Только для тестирования
    useEffect(() => {
        console.log(filesName)
    }, [filesName]);

    // Загружает первый в списке файл с сервера
    const downloadClick = () => {
        console.log(filesName[0])
        downloadFile(filesName[0], '/')
    }

    // Удаляет первый в списке файл с сервера
    const deleteFileClick = () => {
        deleteFile(filesName[0], '/')
    }

    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
            <button onClick={downloadClick}>Get first</button>
            <button onClick={deleteFileClick}>Delete first</button>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='storage-main'>
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
