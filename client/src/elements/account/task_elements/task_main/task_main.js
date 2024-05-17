import {AssignmentOutlined, MoreVert} from "@mui/icons-material";
import {isMobile} from "react-device-detect";
import {styles} from "./styles/style_task_main";
import './styles/style_task_main.css'

export default function TaskMain(props){
    const handleTaskClick = () => {
        if (props.isActive){
            props.setActiveID(null)
        } else {
            props.setActiveID(props.id)
        }
    }

    const moreWrapStyle = () => {
        const visibility = {visibility:
                (props.isHover + props.open + isMobile ? 'visible' : "hidden")}
        if (props.open){
            return {...visibility, backgroundColor: '#D6D6D6'}
        } else {
            return visibility
        }
    }

    const moreClick = (event) => {
        event.stopPropagation();
        props.setHover(false)
        props.setAnchorEl(event.currentTarget);
    }

    const mainStyle = () =>{
        if (props.isActive){
            return {borderBottom: 'none',
                backgroundColor: '#E8F0FE'
            }
        } else if (!props.isLast){
            return {borderBottom: '1px solid #E0E0E0'}
        }
    }

    return (
        <div className='task-main'
             style={mainStyle()}
             onClick={handleTaskClick}
        >
            <div className='task-icon-wrap'>
                <AssignmentOutlined style={styles.iconStyle}/>
            </div>
            <div className={props.isTask ? 'task-title-wrap' : 'task-title-wrap work-title-wrap'}>
                <div className='task-title-text task-main-text-all'>
                    {props.title}
                </div>
            </div>
            {props.isWork &&
                <div className='work-grade-wrap'>
                    <span className='task-main-text-all'>
                        Назначено
                    </span>
                </div>
            }
            {props.isTask &&
                <div className='task-more-btn-wrap'
                     style={moreWrapStyle()}
                     onClick={moreClick}
                >
                    <MoreVert style={styles.moreIconStyle}/>
                </div>
            }
        </div>
    )
}