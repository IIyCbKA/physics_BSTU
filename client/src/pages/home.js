import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';
import {uploadFile} from '../actions/files'
import {useCallback, useEffect} from "react";
import '../styles/style.css'
import {useDropzone} from 'react-dropzone'
import { $host } from '../routes';
import { socket } from '../socket_client';

function Home() {
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => uploadFile(file, ''));
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    //let cnt = 0
    //socket.on('files_list_response', (data) => {
    //    cnt+=1
    //    console.log(cnt)
    //    console.log(data)
    //});

    //const getFilesName = async () => {
    //    try{
    //        await $host.get('/api/get_files', {params: {path: ''}})
    //    }
    //    catch (e){
    //        console.log(e)
    //    }
    //}

    //useEffect(() => {getFilesName()}, [])
    return (
        <div>
            <Helmet>
                <title>Физика</title>
            </Helmet>
            <Header/>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='storage-main'>
                </div>
                {isDragActive &&
                    <div className='drop-area'>
                        Загрузить файлы в хранилище
                    </div>
                }
            </div>
        </div>
    );
}

export default Home;
