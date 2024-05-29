import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import MenuItemDefault from "../../../../pages_menu/items_pattern";


export default function JournalMenu(props){
    const handleClose = () => {
        props.setAnchorEl(null);
        props.setSelectStudentID(null);
        props.setSelectWork(null);
    };

    const handleCheck = () => {
        console.log(props.work.works.length)
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
                onClick={handleCheck}
                text='Изменить оценку'
            />
            <MenuItemDefault
                onClick={handleCheck}
                text='Посмотреть работу'
                disabled={props.work && props.work.works.length === 0}
            />
            <MenuItemDefault
                onClick={handleCheck}
                text='Вернуть работу'
                disabled={props.work && props.work.works.length === 0}
            />
        </Menu>
    )
}