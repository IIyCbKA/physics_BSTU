import {styles} from "../styles/style_main_table";
import {TableCell} from "@mui/material";
import '../styles/style_main_table.css'

export default function GradeCellJournal(props){
    const isActive = props.selectStudentID === props.studentID &&
        props.selectWork === props.task
    const isUnchecked = props.task.grade.status === 'Сдано' &&
        !props.task.grade.grade

    const handleGradeCellClick = (event, work, studentID) => {
        props.setSelectWork(work);
        props.setSelectStudentID(studentID);
        props.setAnchorEl(event.currentTarget);
    }

    return(
        <TableCell
            style={styles.defaultCell}
            onClick={(event) => handleGradeCellClick(event,
                props.task, props.studentID)}
        >
            <div className={'default-grade-cell' + (isUnchecked ?
                    ' completed-grade-cell' : '') +
                (isActive ? ' active-cell' : '')}>
                <div className='journal-grade-text'>
                    {props.task.grade.grade ? props.task.grade.grade : ''}
                </div>
            </div>
        </TableCell>
    )
}