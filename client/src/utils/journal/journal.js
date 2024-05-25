import './styles/style_journal.css'
import {Group, KeyboardArrowRight} from "@mui/icons-material";
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

    const journalClick = () => {
        props.setShow(true)
        dispatch(getGroupStudents(props.id))
    }

    const decorWrapStyle = () => {
        return {visibility:
                isHover + isMobile ? 'visible' : "hidden"}
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
                    <KeyboardArrowRight style={{fontSize: '24px', color: '#161616'}}/>
                </div>
            </div>
        </div>
    )
}