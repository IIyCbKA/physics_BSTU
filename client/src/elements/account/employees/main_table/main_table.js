import {useSelector} from "react-redux";
import {styles} from './styles/style_main_table'
import './styles/style_main_table.css'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material';
import {useEffect, useRef, useState} from "react";
import JournalMenu from "./menu/journal_table_menu";


export default function MainJournal(){
    const journalInfo = useSelector(state => state.selectedGroup)
    const tableRef = useRef(null);
    const windowHeight = window.innerHeight
    const [tableIsScrollLeft, setTableIsScrollLeft] = useState(false);
    const [selectTaskID, setSelectTaskID] = useState(null);
    const [selectStudentID, setSelectStudentID] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (tableRef.current){
            tableRef.current.style.height = `${windowHeight - 65}px`
            tableRef.current.style.overflow = 'auto'
            tableRef.current.style.minHeight = `65px`

            tableRef.current.addEventListener('scroll', () => {
                setTableIsScrollLeft(tableRef.current.scrollLeft > 0)
            });
        }
    }, [tableRef, windowHeight]);

    const handleGradeCellClick = (event, taskID, studentID) => {
        setSelectTaskID(taskID);
        setSelectStudentID(studentID);
        setAnchorEl(event.currentTarget);
    }

    return (
        <div style={{display: 'flex'}}>
            <TableContainer
                component={Paper}
                style={{boxShadow: 'None'}}
                ref={tableRef}
            >
                <Table style={styles.tableStyle}>
                    <TableBody>
                        <TableRow key={'tasks'}>
                            <TableCell style={styles.stickyCell}>
                                <div className={`task-sticky-cell 
                            ${tableIsScrollLeft ? ' sticky-cell-box-shadow' : ''
                                }`}/>
                            </TableCell>
                            {journalInfo.tasks.map((task) =>
                                <TableCell
                                    key={task.id}
                                    style={styles.defaultCell}
                                >
                                    <div className='default-task-ceil'>
                                        <div className='journal-task-info-text'>
                                            {task.name}
                                        </div>
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                        {journalInfo.students.map((student) =>
                            <TableRow key={student.id}>
                                <TableCell style={styles.stickyCell}>
                                    <div className={`student-sticky-cell 
                                ${tableIsScrollLeft ?
                                        ' sticky-cell-box-shadow' : ''}`}>
                                        <div className='student-info-text'>
                                            {`${student.surname} 
                                        ${student.name} 
                                        ${student.patronymic}`}
                                        </div>
                                    </div>
                                </TableCell>
                                {student.works.map((task) =>
                                    <TableCell
                                        key={`${task.id}_${student.id}`}
                                        style={styles.defaultCell}
                                        onClick={(event) => handleGradeCellClick(
                                            event, task.id, student.id)}
                                    >
                                        <div className={'default-grade-cell'
                                            + (task.grade.status === 'Сдано' ?
                                                ' completed-grade-cell' : '')}>
                                            <div className='journal-grade-text'>
                                                {task.grade.grade ?
                                                    task.grade.grade : ''}
                                            </div>
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <JournalMenu
                open={open}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                studentID={selectStudentID}
                taskID={selectTaskID}
                setStudentID={setSelectStudentID}
                setTaskID={setSelectTaskID}
            />
        </div>
    )
}