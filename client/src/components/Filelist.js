import React, {useState, useEffect} from 'react';
import {socket} from "../socket_client";
import {defaultStyles, FileIcon} from 'react-file-icon';
import iconDownload from "../images/upload.png";
import "../styles/style.css"


const FileUploader = () => {
    const SentFile = (name, file) => {
        socket.emit('file', {
            name: name,
            file: file
        })
    };

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileUrls, setFileUrls] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        const urls = files.map(file => URL.createObjectURL(file));
        setFileUrls([...fileUrls, ...urls]);
    };

    // Обработка получения файла через WebSocket
    useEffect(() => {
        socket.on('fileReceived', (data) => {
            // Проверка типа файла
            if (data.type === "image") {
                setFileUrls([...fileUrls, URL.createObjectURL(data.file)]);
            }
        });
        return () => {
            socket.off('fileReceived');
        };
    }, [fileUrls]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedFiles.length > 0) {
            selectedFiles.forEach((file, index) => {
                const formData = new FormData();
                formData.append('file', file);
                SentFile(file.name, file);
            });
        } else {
            alert('Пожалуйста, выберите файлы');
        }
    };

    return (
        <div className="store-style">
            <span><h4>Файлы</h4></span>
            <div className="actions-container">
                <div className="dropdown">
                    <input
                        type="file"
                        id="fileInput"
                        style={{display: "none"}}
                        onChange={handleFileChange}
                        multiple
                    />
                    <label
                        htmlFor="fileInput"
                        style={{
                            padding: "10px 15px",
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}>
                        <img
                            src={iconDownload}
                            alt="iconDownload"
                            height="50px"
                            width="75px"
                        />
                    </label>
                </div>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div style={{display: "flex", flexWrap: "wrap", marginTop: "40px"}}>
                    {fileUrls.map((url, index) => (
                        <div key={index}
                             style={{marginRight: "30px", marginBottom: "30px", width: '50px', height: '50px'}}>
                            <FileIcon
                                extension={selectedFiles[index].name.split('.').pop()} {...defaultStyles.bmp} />
                            <p className="style-text-file">{selectedFiles[index].name}</p>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
};

export default FileUploader;