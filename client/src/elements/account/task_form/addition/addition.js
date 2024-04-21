import './styles/style_addition.css'
import {LinkOutlined, UploadOutlined} from "@ant-design/icons";
import {styles} from './styles/style_addition'
import {Button} from "react-bootstrap";
import React, {useRef, useState} from "react";
import ModalLink from "./link_modal";


export default function Addition(){
    const [isModalOpen, setModalOpen] = useState(false)

    const fileInputRef = useRef(null);

    const handleCloseModal = () => {
        setModalOpen(false)
    }
    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleFileSelect = async (event) => {
        const selectedFile = event.target.files[0];
        try {
            // тут кидаем файл на сервак и получаем ответ
        } catch (error) {
            console.log(error);
        }

        event.target.value = null;
    }

    const handleAddFileClick = () => {
        fileInputRef.current.click();
    }

    return (
        <div className='addition-wrap'>
            <input type="file" ref={fileInputRef}
                   style={{display: 'none'}}
                   onChange={handleFileSelect}
            />

            <div className='addition-form'>
                <span className='addition-title'>
                    Прикрепить
                </span>
                <div className='addition-buttons-wrap'>
                    <div className='addition-btn-area'>
                        <div className='addition-btn-icon-wrap'>
                            <Button className='addition-btn-style'
                                    onClick={handleAddFileClick}
                            >
                                <UploadOutlined style={styles.styleIcons}/>
                            </Button>
                        </div>
                        <div className='addition-btn-text-wrap'>
                            Загрузить
                        </div>
                    </div>
                    <div className='addition-btn-area'>
                        <div className='addition-btn-icon-wrap'>
                            <Button className='addition-btn-style'
                                    onClick={handleOpenModal}>
                                <LinkOutlined style={styles.styleIcons}/>
                            </Button>
                        </div>
                        <div className='addition-btn-text-wrap'>
                            Ссылка
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen &&
                <ModalLink
                    show={isModalOpen}
                    handleClose={handleCloseModal}
                />
            }
        </div>
    )
}