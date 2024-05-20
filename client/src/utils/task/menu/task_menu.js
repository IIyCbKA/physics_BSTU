import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {styles} from '../../../elements/pages_menu/styles/style_task_menu'
import '../../../elements/pages_menu/styles/style_task_menu.css'
import {useDispatch} from "react-redux";
import {setUpdatingTask} from "../../../reducers/journal_reducer";

export default function TaskMenu(props){
    const dispatch = useDispatch();
    const handleClose = () => {
        props.setAnchorEl(null);
    };

    const handleEditClick = async () => {
        handleClose();
        dispatch(setUpdatingTask(props.task))
    }

    const handleDeleteClick = () => {
        handleClose()
        props.setShowModal(true);
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