import {Item, Menu} from "react-contexify";
import iconCreatFolder from "./icons/add_folder_icon128.png";
import 'react-contexify/ReactContexify.css';
import '../../styles/style.css'

export default function ContextMenuDisk(){
    return (
        <Menu id='disk-context-menu'>
            <Item id={"create_folder"}>
                <img src={iconCreatFolder} alt="icon"
                     className="menu-item-icon"/>
                Create folder
            </Item>
        </Menu>
    )
}