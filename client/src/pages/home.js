import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';
import {uploadFile} from '../actions/files'
import {useState} from "react";
import '../styles/style.css'

function Home() {
    const [dragEnter, setDragEnter] = useState(false);

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => uploadFile(file, '/'))

    }

    function dragEnterHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => uploadFile(file, '/'))
        setDragEnter(false)
    }

    return (
        !dragEnter ?
            <div
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}
            >
                <Helmet>
                    <title>Физика</title>
                </Helmet>
                <Header/>
                <input
                    onInput={fileUploadHandler}
                    multiple={true}
                    type="file"
                    id="disk_upload_input"
                    className="disk_upload_input">
                </input>
            </div>
        :
            <div>
                <Header/>
                <div
                    className='drop-area'
                    onDragEnter={dragEnterHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragEnterHandler}
                    onDrop={dropHandler}
                >
                    Перетащите файлы сюда
                </div>
            </div>

    );
}

export default Home;
