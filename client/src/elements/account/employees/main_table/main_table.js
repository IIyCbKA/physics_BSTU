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


export default function MainJournal(){
    const journalInfo = useSelector(state => state.selectedGroup)
    const tableRef = useRef(null);
    const windowHeight = window.innerHeight
    const [tableIsScrollLeft, setTableIsScrollLeft] = useState(false);

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

    return (
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
                            {student.works.map((work) =>
                                <TableCell
                                    key={`${work.id}_${student.id}`}
                                    style={styles.defaultCell}
                                >
                                    <div className={'default-grade-cell'
                                    + (work.grade.status === 'Сдано' ?
                                        ' completed-grade-cell' : '')}>
                                        <div className='journal-grade-text'>
                                            {work.grade.grade ?
                                                work.grade.grade : ''}
                                        </div>
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}