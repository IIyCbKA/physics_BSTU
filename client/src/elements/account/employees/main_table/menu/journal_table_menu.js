import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import MenuItemDefault from "../../../../pages_menu/items_pattern";


export default function JournalMenu(props){
    const handleClose = () => {
        props.setAnchorEl(null)
    };

    const handleExited = () => {
        if (!props.isModalsOpen){
            props.cleanSelectInfo()
        }
    }

    const changeGrade = async () => {
        props.setModalGradeOpen(true)
        handleClose();
    }

    const viewWork = () => {
    }

    const returnWork = async () => {
        props.setModalReturnWorkOpen(true)
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
            TransitionProps={{
                onExited: handleExited
            }}
        >
            <MenuItemDefault
                onClick={changeGrade}
                text='Изменить оценку'
            />
            <MenuItemDefault
                onClick={viewWork}
                text='Посмотреть работу'
                disabled={props.work && props.work.grade.status !== 'Сдано'}
            />
            <MenuItemDefault
                onClick={returnWork}
                text='Вернуть работу'
                disabled={props.work && props.work.grade.status !== 'Сдано'}
            />
        </Menu>
    )
}