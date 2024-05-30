import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import MenuItemDefault from "../../../../pages_menu/items_pattern";
import {returnStudentWork} from "../../../../../actions/journal";


export default function JournalMenu(props){
    const handleClose = () => {
        props.selectInfoClean()
    };

    const changeGrade = async () => {
        props.setModalGradeOpen(true)
    }

    const viewWork = () => {
    }

    const returnWork = async () => {
        await returnStudentWork(props.work.id, props.studentID)
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
                onClick={changeGrade}
                text='Изменить оценку'
            />
            <MenuItemDefault
                onClick={viewWork}
                text='Посмотреть работу'
                disabled={props.work && props.work.works.length === 0}
            />
            <MenuItemDefault
                onClick={returnWork}
                text='Вернуть работу'
                disabled={props.work && props.work.works.length === 0}
            />
        </Menu>
    )
}