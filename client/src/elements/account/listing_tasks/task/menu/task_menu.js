import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

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
            <MenuItem onClick={handleEditClick}>Изменить</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Удалить</MenuItem>
        </Menu>
    )
}