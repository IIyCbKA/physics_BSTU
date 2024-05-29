import {styles} from "./styles/style_task_menu";
import MenuItem from "@mui/material/MenuItem";
import './styles/style_task_menu.css'


export default function MenuItemDefault(props){
    return (
        <MenuItem
            onClick={props.onClick}
            style={styles.menuItem}
            disabled={props.disabled}
        >
            <div className='default-menu-item'>
                <div className='default-menu-item-text'>
                    {props.text}
                </div>
            </div>
        </MenuItem>
    )
}