import {Item, Menu} from "react-contexify";
import iconDownload from "./icons/dowload_icon94.png";
import iconDelete from "./icons/icons8-trash-can-48.png";
import 'react-contexify/ReactContexify.css';
import {deleteFile, downloadFile} from "../../actions/files";
import '../../styles/style.css'

export default function ContextMenu(props){
    const onDownload = async () => {
        await downloadFile(props.name, props.id)
    }

    const onDelete = async () => {
        await deleteFile(props.id)
    }

    return (
        <Menu id={props.id}>
            <Item id={"download"}
                  onClick={onDownload}
            >
                <img src={iconDownload} alt="icon"
                     className="menu-item-icon"/>
                Download
            </Item>
            <Item id="delete"
                  onClick={onDelete}
            >
                <img src={iconDelete} alt="icon"
                     className="menu-item-icon"/>
                Delete
            </Item>
        </Menu>
    )
}