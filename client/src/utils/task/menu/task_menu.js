import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import {useDispatch} from "react-redux";
import {setUpdatingTask} from "../../../reducers/journal_reducer";
import MenuItemDefault from "../../../elements/pages_menu/items_pattern";

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
            <MenuItemDefault
                onClick={handleEditClick}
                text='Изменить'
            />
            <MenuItemDefault
                onClick={handleDeleteClick}
                text='Удалить'
            />
        </Menu>
    )
}