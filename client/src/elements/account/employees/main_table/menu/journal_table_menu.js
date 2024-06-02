import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import MenuItemDefault from "../../../../pages_menu/items_pattern";
import {WORK_STATUS_COMPLETED} from "../../../../../constants";

const CHANGE_GRADE_ITEM_TEXT = 'Изменить оценку'
const VIEW_WORK_ITEM_TEXT = 'Посмотреть работу'
const RETURN_WORK_ITEM_TEXT = 'Вернуть работу'

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
        props.setModalGradeOpen(true);
        handleClose();
    }

    const viewWork = () => {
        props.setModalViewFilesOpen(true);
        handleClose();
    }

    const returnWork = async () => {
        props.setModalReturnWorkOpen(true);
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
                text={CHANGE_GRADE_ITEM_TEXT}
            />
            <MenuItemDefault
                onClick={viewWork}
                text={VIEW_WORK_ITEM_TEXT}
                disabled={props.work && props.work.grade.status !==
                    WORK_STATUS_COMPLETED}
            />
            <MenuItemDefault
                onClick={returnWork}
                text={RETURN_WORK_ITEM_TEXT}
                disabled={props.work && props.work.grade.status !==
                    WORK_STATUS_COMPLETED}
            />
        </Menu>
    )
}