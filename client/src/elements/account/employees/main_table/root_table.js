import './styles/style_main_table.css'
import {TableContainer, Paper} from '@mui/material';
import {useEffect, useRef, useState} from "react";
import JournalMenu from "./menu/journal_table_menu";
import JournalTable from "./table";

export default function MainJournal(){
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

    return (
        <div style={{display: 'flex'}}>
            <TableContainer
                component={Paper}
                style={{boxShadow: 'None'}}
                ref={tableRef}
            >
                <JournalTable
                    tableIsScrollLeft={tableIsScrollLeft}
                    setSelectTaskID={setSelectTaskID}
                    setSelectStudentID={setSelectStudentID}
                    setAnchorEl={setAnchorEl}
                />
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