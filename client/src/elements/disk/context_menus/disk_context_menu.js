import {Item, Menu} from "react-contexify";
import 'react-contexify/ReactContexify.css';
import CreateFolderModal from "../modal/modal_with_config";
import {FileAddOutlined, FolderAddOutlined} from "@ant-design/icons";
import {styles} from './styles/style_context_menu'
import React, {useRef} from 'react'
import {uploadFile} from "../../../actions/files";
import {useSelector} from "react-redux";


export default function ContextMenuDisk(props){
    const fileInputRef = useRef(null);
    const path = useSelector(state => state.file.path)

    const handleCloseModal = () => {
        props.setModalOpen(false)
    }
    const handleOpenModal = () => {
        props.setModalOpen(true)
    }

    const handleAddFileClick = () => {
        fileInputRef.current.click();
    }

    const fileSelectClick = (event) => {
        event.stopPropagation()
    }

    const handleFileSelect = async (event) => {
        const selectedFile = event.target.files[0];
        try {
            await uploadFile(selectedFile, path);
        } catch (error) {
            console.log(error);
        }

        event.target.value = null;
    }

    return (
        <div>
            <input type="file" ref={fileInputRef}
                   style={{display: 'none'}}
                   onChange={handleFileSelect}
                   onClick={fileSelectClick}
            />

            <Menu id='disk-context-menu'>
                <Item id={"create_folder"} onClick={handleOpenModal}>
                    <FolderAddOutlined style={styles.styleContextIcon}/>
                    Создать папку
                </Item>

                <Item id={'add_file'} onClick={handleAddFileClick}>
                    <FileAddOutlined style={styles.styleContextIcon}/>
                    Добавить файл
                </Item>
            </Menu>
            {props.isModalOpen &&
                <CreateFolderModal
                    show={props.isModalOpen}
                    handleClose={handleCloseModal}
                />
            }
        </div>
    )
}