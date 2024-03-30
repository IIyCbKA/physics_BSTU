import {Item, Menu} from "react-contexify";
import iconCreatFolder from "./icons/add_folder_icon128.png";
import 'react-contexify/ReactContexify.css';
import './styles/style.css'
import CreateFolderModal from "./modal/modal_with_config";

export default function ContextMenuDisk(props){
    const handleCloseModal = () => {
        props.setModalOpen(false)
    }
    const handleOpenModal = () => {
        props.setModalOpen(true)
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
            {props.isModalOpen &&
                <CreateFolderModal
                    show={props.isModalOpen}
                    handleClose={handleCloseModal}
                />
            }
        </div>
    )
}