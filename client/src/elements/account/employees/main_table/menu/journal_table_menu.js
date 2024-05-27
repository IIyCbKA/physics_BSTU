import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {styles} from '../../../../pages_menu/styles/style_task_menu'
import '../../../../pages_menu/styles/style_task_menu.css'


export default function JournalMenu(props){
    const handleClose = () => {
        props.setAnchorEl(null);
    };

    const handleCheck = () => {
        console.log(props.studentID, props.taskID)
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
                onClick={handleCheck}
                style={styles.menuItem}
            >
                <div className='default-menu-item'>
                    <div className='default-menu-item-text'>
                        Выставить оценку
                    </div>
                </div>
            </MenuItem>
            <MenuItem
                onClick={handleCheck}
                style={styles.menuItem}
            >
                <div className='default-menu-item'>
                    <div className='default-menu-item-text'>
                        Посмотреть работу
                    </div>
                </div>
            </MenuItem>
            <MenuItem
                onClick={handleCheck}
                style={styles.menuItem}
            >
                <div className='default-menu-item'>
                    <div className='default-menu-item-text'>
                        Вернуть работу
                    </div>
                </div>
            </MenuItem>
        </Menu>
    )
}