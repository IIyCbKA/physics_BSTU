import TaskAddition from "../addition/task_addition";
import './styles/style_task_info.css'
import {useLayoutEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

export default function TaskInfo(props){
    const [heightInfo, setHeight] = useState(0);
    const infoRef = useRef(null);
    const windowWidth = useSelector(state => state.app.width)

    useLayoutEffect(() => {
        setHeight(infoRef.current.scrollHeight);
    }, [infoRef, heightInfo, windowWidth, props.description, props.additions])

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

    return (
        <div className='task-info-wrap' style={infoStyle()}>
            <div className='task-info-main' ref={infoRef}>
                {props.description.length === 0 &&
                props.additions.length === 0 ?
                    <span className='task-info-text-all task-info-absence'>
                            Дополнительные материалы отсутствуют
                        </span> :
                    <span
                        className='task-info-description task-info-text-all'>
                            {props.description}
                        </span>
                }
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
    )
}