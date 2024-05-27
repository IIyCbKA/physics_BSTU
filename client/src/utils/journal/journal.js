import './styles/style_journal.css'
import {Group, KeyboardArrowRight} from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import {useState} from "react";
import {isMobile} from "react-device-detect";
import {useDispatch} from "react-redux";
import {getGroupStudents} from "../../actions/journal";

export default function Journal(props){
    const [isHover, setHover] = useState(false)
    const dispatch = useDispatch()

    const mainStyle = () =>{
        if (!props.isLast){
            return {borderBottom: '1px solid #E0E0E0'}
        }
    }

    const journalClick = async () => {
        props.setJournalLoadID(props.id)
        await dispatch(getGroupStudents(props.id))
        props.setShow(true)
        setTimeout(() => {
            props.setJournalLoadID(null)
        }, 300)
    }

    const decorWrapStyle = () => {
        return {visibility:
                props.isLoad + isHover + isMobile ? 'visible' : "hidden"}
    }

    return (
        <div className='journal-wrap'
             onMouseEnter={() => {setHover(true)}}
             onMouseLeave={() => {setHover(false)}}
        >
            <div className='journal-main' style={mainStyle()} onClick={journalClick}>
                <div className='default-journal-icon-wrap journal-icon-wrap'>
                    <Group style={{fontSize: '24px', color: '#FFFFFF'}}/>
                </div>
                <div className='journal-title-wrap'>
                    <div className='journal-title-text'>
                        {props.groupName}
                    </div>
                </div>
                <div
                    className='default-journal-icon-wrap decor-icon-wrap'
                    style={decorWrapStyle()}
                >
                    {props.isLoad ?
                        <CircularProgress style={{width: '24px',
                            height: '24px', color: '#161616'}}/> :
                        <KeyboardArrowRight style={{fontSize: '24px',
                            color: '#161616'}}/>
                    }
                </div>
            </div>
        </div>
    )
}