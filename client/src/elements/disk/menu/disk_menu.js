import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import {styles} from "../../pages_menu/styles/style_task_menu";
import '../../pages_menu/styles/style_task_menu.css'
import {uploadFile} from "../../../actions/files";
import {useSelector} from "react-redux";
import React, {useRef} from "react";

export default function DiskMenu(props){
    const fileInputRef = useRef(null);
    const path = useSelector(state => state.file.path)

    const handleClose = () => {
        props.setAnchorEl(null);
    };

    const handleAddFileClick = () => {
        handleClose();
        fileInputRef.current.click();
    }

    const handleCreateFolderClick = () => {
        handleClose();
        props.setModalShow(true)
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
        <div style={{display: 'flex'}}>
            <input type="file" ref={fileInputRef}
                   style={{display: 'none'}}
                   onChange={handleFileSelect}
            />
            <Menu
                id="disk-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem
                    onClick={handleCreateFolderClick}
                    style={styles.menuItem}
                >
                    <div className='task-menu-item'>
                        <div className='task-menu-item-text'>
                            Создать папку
                        </div>
                    </div>
                </MenuItem>
                <MenuItem
                    onClick={handleAddFileClick}
                    style={styles.menuItem}
                >
                    <div className='task-menu-item'>
                        <div className='task-menu-item-text'>
                            Добавить файл
                        </div>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    )
}