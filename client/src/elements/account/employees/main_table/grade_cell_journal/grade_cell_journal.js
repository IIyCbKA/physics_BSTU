import {styles} from "../styles/style_main_table";
import {TableCell} from "@mui/material";
import '../styles/style_main_table.css'

export default function GradeCellJournal(props){
    const handleGradeCellClick = (event, taskID, studentID) => {
        props.setSelectTaskID(taskID);
        props.setSelectStudentID(studentID);
        props.setAnchorEl(event.currentTarget);
    }

    return(
        <TableCell
            style={styles.defaultCell}
            onClick={(event) => handleGradeCellClick(event,
                props.task.id, props.studentID)}
        >
            <div className={'default-grade-cell' + (props.task.grade.status
            === 'Сдано' ? ' completed-grade-cell' : '')}>
                <div className='journal-grade-text'>
                    {props.task.grade.grade ? props.task.grade.grade : ''}
                </div>
            </div>
        </TableCell>
    )
}