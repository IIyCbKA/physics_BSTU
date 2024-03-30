import {Item, Menu} from "react-contexify";
import iconDownload from "./icons/dowload_icon94.png";
import iconDelete from "./icons/icons8-trash-can-48.png";
import 'react-contexify/ReactContexify.css';
import {deleteFile, downloadFile} from "../../actions/files";
import './styles/style.css'

export default function ContextMenuFile(props){
    const onDownload = async () => {
        await downloadFile(props.name, props.id)
    }

    const onDelete = async () => {
        await deleteFile(props.id)
    }

    return (
        <Menu id={props.id}>
            {props.type !== 'folder' &&
                <Item id={"download"}
                      onClick={onDownload}
                >
                    <img src={iconDownload} alt="icon"
                         className="menu-item-icon"/>
                    Скачать
                </Item>
            }
            <Item id="delete"
                  onClick={onDelete}
            >
                <img src={iconDelete} alt="icon"
                     className="menu-item-icon"/>
                Удалить
            </Item>
        </Menu>
    )
}