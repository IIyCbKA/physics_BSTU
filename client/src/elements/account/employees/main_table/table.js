import {styles} from "./styles/style_main_table";
import './styles/style_main_table.css'
import {Table, TableBody, TableCell, TableRow} from "@mui/material";
import TaskCellJournal from "./task_cell_journal/task_cell_journal";
import StudentCellJournal from "./student_cell_journal/student_cell_journal";
import GradeCellJournal from "./grade_cell_journal/grade_cell_journal";
import {useSelector} from "react-redux";

export default function JournalTable(props){
    const journalInfo = useSelector(state => state.selectedGroup)

    return(
        <Table style={styles.tableStyle}>
            <TableBody>
                <TableRow key={'tasks'}>
                    <TableCell style={styles.stickyCell}>
                        <div className={`task-sticky-cell 
                            ${props.tableIsScrollLeft ? 
                            ' sticky-cell-box-shadow' : ''}`}/>
                    </TableCell>
                    {journalInfo.tasks.map((task) =>
                        <TaskCellJournal
                            key={task.id}
                            name={task.name}
                        />
                    )}
                </TableRow>
                {journalInfo.students.map((student) =>
                    <TableRow key={`${student.id}_${student.surname}`}>
                        <StudentCellJournal
                            key={student.id}
                            tableIsScrollLeft={props.tableIsScrollLeft}
                            surname={student.surname}
                            name={student.name}
                            patronymic={student.patronymic}
                        />
                        {student.works.map((work) =>
                            <GradeCellJournal
                                key={`${work.id}_${student.id}`}
                                task={work}
                                studentID={student.id}
                                setSelectWork={props.setSelectWork}
                                setSelectStudentID={props.setSelectStudentID}
                                setAnchorEl={props.setAnchorEl}
                                selectStudentID={props.selectStudentID}
                                selectWork={props.selectWork}
                            />
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}