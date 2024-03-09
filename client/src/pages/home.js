import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';
import {uploadFile, downloadFile, deleteFile, getFilesName} from '../actions/files'
import {useCallback, useEffect, useState} from "react";
import '../styles/style.css'
import {useDropzone} from 'react-dropzone'
import { createSocket } from '../socket_client';
import { useLocation } from 'react-router-dom';

function Home() {
    // Список строк с именами файлов и директорий по текущему пути
    const [filesName, setFilesName] = useState([])
    const [locationPath, setLocationPath] = useState('')
    
    const location = useLocation();
    let path = location.pathname;
    if (!path.endsWith('/')){
        path += '/';
    }
    useEffect(() => {
        console.log(path)
        setLocationPath(path)

        getFilesName(path)
            .then(result => {
                setFilesName(result);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
        
    }, [path]);

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => uploadFile(file, path));
    }, [path]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    // Список имён вложенных директорий
    //const [directoriesPath, setDirectoriesPath] = useState([])

    const socket = createSocket()

    socket.onmessage = (event) => {
       setFilesName(JSON.parse(event.data))
    }

    // Получает список файлов при загрузке страницы
    //useEffect(() => {
        
    //}, [])

    // Выводит в консоль список файлов при его изменении
    // Только для тестирования
    useEffect(() => {
       console.log(filesName)
    }, [filesName]);

    // Загружает первый в списке файл с сервера
    const downloadClick = () => {
       downloadFile(filesName[0], locationPath)
    }

    // Удаляет первый в списке файл с сервера
    const deleteFileClick = () => {
       deleteFile(filesName[0], locationPath)
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
