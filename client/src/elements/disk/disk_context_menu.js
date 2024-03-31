import {Item, Menu} from "react-contexify";
import 'react-contexify/ReactContexify.css';
import './styles/style_disk.css'
import CreateFolderModal from "./modal/modal_with_config";
import {FolderAddOutlined} from "@ant-design/icons";
import {styles} from './styles/style_disk'

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
                    <FolderAddOutlined style={styles.styleContextIcon}/>
                    Создать папку
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