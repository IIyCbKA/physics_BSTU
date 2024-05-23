import TaskAddition from "../../task/addition/task_addition";
import './styles/style_task_info.css'
import React, {useLayoutEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import AdditionEntity from "../../entity_addition/addition_entity";
import {getFileType} from "../../../actions/strings";
import AddFileBtn from "../add_file_btn/add_file_btn";
import SubmitWorkBtn from "../submit_work_btn/submit_work_btn";

export default function TaskInfo(props){
    const [heightInfo, setHeight] = useState(0);
    const infoRef = useRef(null);
    const windowWidth = useSelector(state => state.app.width)

    useLayoutEffect(() => {
        setHeight(infoRef.current.scrollHeight);
    }, [infoRef, heightInfo, windowWidth, props.description,
        props.additions, props.files])

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
                {props.isTask &&
                <div>
                    {props.description.length === 0 &&
                    props.additions.length === 0 ?
                        <span className='task-info-text-all task-info-absence'>
                            Дополнительные материалы отсутствуют
                        </span> :
                        <span className='task-info-default-text task-info-text-all'>
                            {props.description}
                        </span>
                    }
                    {
                    props.additions.map((addition) => (
                        <TaskAddition
                            key={addition.id}
                            id={addition.id}
                            name={addition.title}
                            type={addition.type}
                            content={addition.content}
                        />
                    ))
                    }
                </div>
                }

                {props.isWork &&
                <div>
                    {
                    props.files.length === 0 ?
                    <span className='task-info-text-all task-info-absence'>
                         Прикрепленные файлы отсутствуют
                    </span> :
                    props.files.map((file) => (
                        <AdditionEntity
                            isWorkFile={true}
                            workInfo={props.grade}
                            type='file'
                            name={file.filename}
                            content={{fileType: getFileType(file.filename)}}
                            grade={props.grade}
                            id={file.file_id}
                            key={file.file_id}
                        />
                    ))
                    }
                    <div className='work-btns-wrap'>
                        <AddFileBtn
                            id={props.id}
                            workInfo={props.grade}
                        />
                        <SubmitWorkBtn
                            id={props.id}
                            disabled={props.files.length === 0}
                            workInfo={props.grade}
                        />
                    </div>
                </div>
                }
            </div>
        </div>
    )
}