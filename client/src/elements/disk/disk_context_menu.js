import {Item, Menu} from "react-contexify";
import iconCreatFolder from "./icons/add_folder_icon128.png";
import 'react-contexify/ReactContexify.css';
import '../../styles/style.css'
import CreateFolderModal from "./create_folder_modal";
import {useState} from "react";

export default function ContextMenuDisk(){
    const [isModalOpen, setModalOpen] = useState(false)
    const handleCloseModal = () => {
        setModalOpen(false)
    }
    const handleOpenModal = () => {
        setModalOpen(true)
    }

    return (
        <div>
            <Menu id='disk-context-menu'>
                <Item id={"create_folder"}
                      onClick={handleOpenModal}
                >
                    <img src={iconCreatFolder} alt="icon"
                         className="menu-item-icon"/>
                    Create folder
                </Item>
            </Menu>
            <CreateFolderModal show={isModalOpen} handleClose={handleCloseModal} />
        </div>
    )
}