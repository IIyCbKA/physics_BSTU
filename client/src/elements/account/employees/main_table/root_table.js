import './styles/style_main_table.css'
import {TableContainer, Paper} from '@mui/material';
import {useEffect, useState} from "react";
import JournalMenu from "./menu/journal_table_menu";
import JournalTable from "./table";
import ChangeGradeModal from "./modals/change_grade_modal";

export default function MainJournal(props){
    const windowHeight = window.innerHeight
    const [tableIsScrollLeft, setTableIsScrollLeft] = useState(false);
    const [selectWork, setSelectWork] = useState(null);
    const [selectStudentID, setSelectStudentID] = useState(null);
    const [modalGradeOpen, setModalGradeOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const selectInfoClean = () => {
        setAnchorEl(null);
        setTimeout(() => {
            setSelectWork(null);
            setSelectStudentID(null);
        }, 225)
    }

    useEffect(() => {
        if (props.tableContainerRef.current){
            props.tableContainerRef.current.style.height = `${windowHeight - 65}px`
            props.tableContainerRef.current.style.overflow = 'auto'
            props.tableContainerRef.current.style.minHeight = `65px`

            props.tableContainerRef.current.addEventListener('scroll', () => {
                setTableIsScrollLeft(props.tableContainerRef.current.scrollLeft > 0)
            });
        }
    }, [props.tableContainerRef, windowHeight]);

    return (
        <div style={{display: 'flex'}}>
            <TableContainer
                component={Paper}
                style={{boxShadow: 'None'}}
                ref={props.tableContainerRef}
            >
                <JournalTable
                    tableIsScrollLeft={tableIsScrollLeft}
                    setSelectWork={setSelectWork}
                    setSelectStudentID={setSelectStudentID}
                    setAnchorEl={setAnchorEl}
                    selectWork={selectWork}
                    selectStudentID={selectStudentID}
                />
            </TableContainer>
            <JournalMenu
                open={open}
                anchorEl={anchorEl}
                studentID={selectStudentID}
                work={selectWork}
                setModalGradeOpen={setModalGradeOpen}
                selectInfoClean={selectInfoClean}
            />
            {modalGradeOpen &&
                <ChangeGradeModal
                    show={modalGradeOpen}
                    setShow={setModalGradeOpen}
                    studentID={selectStudentID}
                    work={selectWork}
                    selectInfoClean={selectInfoClean}
                />
            }
        </div>
    )
}