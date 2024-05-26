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


export default function MainJournal(){
    const journalInfo = useSelector(state => state.selectedGroup)
    const minJournalHeight = window.innerHeight - 65

    return (
        <TableContainer component={Paper} style={{minHeight: minJournalHeight}}>
            <Table>
                <TableBody>
                    <TableRow key={'tasks'}>
                        <TableCell style={styles.stickyCell}>
                            <div className='task-sticky-cell'/>
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
                                <div className='student-sticky-cell'>
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
                                    <div className='default-grade-cell'>
                                        <div className='journal-grade-text'>
                                            {work.grade.grade ? work.grade.grade : ''}
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