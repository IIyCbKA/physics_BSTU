import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {styles} from './styles/style_task_menu'
import './styles/style_task_menu.css'

export default function TaskMenu(props){
    const handleClose = () => {
        props.setAnchorEl(null);
    };

    const handleEditClick = () => {
        // тут привязка к редактированию
        handleClose();
    }

    const handleDeleteClick = () => {
        // тут привязка к удалению
        handleClose();
    }

    return (
        <Menu
            id="fade-menu"
            MenuListProps={{
                'aria-labelledby': 'fade-button',
            }}
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem
                onClick={handleEditClick}
                style={styles.menuItem}
            >
                <div className='task-menu-item'>
                    <div className='task-menu-item-text'>
                        Изменить
                    </div>
                </div>
            </MenuItem>
            <MenuItem
                onClick={handleDeleteClick}
                style={styles.menuItem}
            >
                <div className='task-menu-item'>
                    <div className='task-menu-item-text'>
                        Удалить
                    </div>
                </div>
            </MenuItem>
        </Menu>
    )
}