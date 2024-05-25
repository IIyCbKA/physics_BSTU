import {useSelector} from "react-redux";
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

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow key={'tasks'}>
                        <TableCell style={{position: 'sticky', left: 0, backgroundColor: '#FFFFFF'}}>
                            {''}
                        </TableCell>
                        {journalInfo.tasks.map((task) =>
                            <TableCell key={task.id}>
                                {task.name}
                            </TableCell>
                        )}
                    </TableRow>
                    {journalInfo.students.map((student) =>
                        <TableRow key={student.id}>
                            <TableCell style={{position: 'sticky', left: 0, backgroundColor: '#FFFFFF'}}>
                                {`${student.surname} ${student.name} ${student.patronymic}`}
                            </TableCell>
                            {student.works.map((work) =>
                                <TableCell key={`${work.id}_${student.id}`}>
                                    {work.grade.grade ? work.grade.grade : ''}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}