import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import {uploadFile} from "../../../actions/files";
import {useSelector} from "react-redux";
import React, {useRef} from "react";
import MenuItemDefault from "../../pages_menu/items_pattern";

export default function DiskMenu(props){
    const fileInputRef = useRef(null);
    const path = useSelector(state => state.file.path)

    const handleClose = () => {
        props.setAnchorEl(null);
    };

    const handleAddFileClick = () => {
        fileInputRef.current.click();
    }

    const handleCreateFolderClick = () => {
        props.setModalShow(true);
    }

    const handleFileSelect = async (event) => {
        handleClose();
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
                <MenuItemDefault
                    onClick={handleCreateFolderClick}
                    text='Создать папку'
                />
                <MenuItemDefault
                    onClick={handleAddFileClick}
                    text='Добавить файл'
                />
            </Menu>
        </div>
    )
}