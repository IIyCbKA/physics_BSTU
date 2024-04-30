import './styles/style_task.css'
import {styles} from './styles/style_task'
import {AssignmentOutlined} from "@mui/icons-material";
import {useState, useEffect, useRef} from "react";
import TaskAddition from "./addition/task_addition";

export default function Task(props){
    const infoRef = useRef(null);
    const [heightInfo, setHeight] = useState(0);

    useEffect(() => {
        if (infoRef.current){
            setHeight(infoRef.current.scrollHeight);
        }
    }, [infoRef, heightInfo])

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

    return(
        <div className='task-root'
             style={rootStyle()}
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
            </div>
            <div className='task-info-wrap' style={infoStyle()} ref={infoRef}>
                <div className='task-info-main'>
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
        </div>
    )
}