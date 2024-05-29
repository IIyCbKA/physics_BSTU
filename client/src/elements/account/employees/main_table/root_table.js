import './styles/style_main_table.css'
import {TableContainer, Paper} from '@mui/material';
import {useEffect, useState} from "react";
import JournalMenu from "./menu/journal_table_menu";
import JournalTable from "./table";

export default function MainJournal(props){
    const windowHeight = window.innerHeight
    const [tableIsScrollLeft, setTableIsScrollLeft] = useState(false);
    const [selectWork, setSelectWork] = useState(null);
    const [selectStudentID, setSelectStudentID] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                studentID={selectStudentID}
                work={selectWork}
                setSelectStudentID={setSelectStudentID}
                setSelectWork={setSelectWork}
            />
        </div>
    )
}