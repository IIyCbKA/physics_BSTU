import './styles/style_task.css'
import {styles} from './styles/style_task'
import {AssignmentOutlined, MoreVert} from "@mui/icons-material";
import {useState, useEffect, useRef} from "react";
import TaskAddition from "./addition/task_addition";
import TaskMenu from "./menu/task_menu";
import {useSelector} from "react-redux";
import DeleteTaskModal from "./modal/delete_task_modal";

export default function Task(props){
    const [isShowModal, setShowModal] = useState(false);
    const windowWidth = useSelector(state => state.app.width)
    const infoRef = useRef(null);
    const [heightInfo, setHeight] = useState(0);
    const [isHover, setHover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const task = {
        id: props.id,
        title: props.title,
        description: props.description,
        additions: props.additions,
        groups: props.groups,
    }

    useEffect(() => {
        if (infoRef.current){
            setHeight(infoRef.current.scrollHeight);
        }
    }, [infoRef, heightInfo, windowWidth, props.description, props.additions])

    const rootStyle = () => {
        if (props.isActive){
            return {boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), ' +
                        '0 2px 6px 2px rgba(60,64,67,.15)',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px'
            }
        }
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

    const infoStyle = () => {
        const defaultStyle = {
            transition: 'height .4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden'
        }

        if (props.isActive){
            return {...defaultStyle,
                height: heightInfo
            }
        } else{
            return {...defaultStyle,
                height: 0
            }
        }
    }

    const handleTaskClick = () => {
        if (props.isActive){
            props.setActiveID(null)
        } else {
            props.setActiveID(props.id)
        }
    }

    const moreWrapStyle = () => {
        const visibility = {visibility: (isHover + open ? 'visible' : "hidden")}
        if (open){
            return {...visibility, backgroundColor: '#D6D6D6'}
        } else {
            return visibility
        }
    }

    const moreClick = (event) => {
        event.stopPropagation();
        setHover(false)
        setAnchorEl(event.currentTarget);
    }

    return(
        <div className='task-root'
             style={rootStyle()}
             onMouseEnter={() => {if(!isShowModal) setHover(true)}}
             onMouseLeave={() => {setHover(false)}}
        >
            <div className='task-main'
                 style={mainStyle()}
                 onClick={handleTaskClick}
            >
                <div className='task-icon-wrap'>
                    <AssignmentOutlined style={styles.iconStyle}/>
                </div>
                <div className='task-title-wrap'>
                    <div className='task-title-text'>
                        {props.title}
                    </div>
                </div>
                <div className='task-more-btn-wrap'
                     style={moreWrapStyle()}
                     onClick={moreClick}
                >
                    <MoreVert style={styles.moreIconStyle}/>
                </div>
            </div>
            <div className='task-info-wrap' style={infoStyle()}>
                <div className='task-info-main' ref={infoRef}>
                    <span className='task-info-description'>
                        {props.description}
                    </span>
                    <div>
                        {props.additions.map(addition => (
                            <TaskAddition
                                key={addition.id}
                                id={addition.id}
                                name={addition.title}
                                type={addition.type}
                                content={addition.content}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <TaskMenu
                open={open}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                task={task}
                setShowModal={setShowModal}
            />
            {isShowModal &&
                <DeleteTaskModal
                    taskID={props.id}
                    isShow={isShowModal}
                    setShowModal={setShowModal}
                />
            }
        </div>
    )
}
