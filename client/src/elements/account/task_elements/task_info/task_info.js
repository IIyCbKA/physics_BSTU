import { addWorkFile } from "../../../../actions/journal";
import TaskAddition from "../../listing_tasks/task/addition/task_addition";
import './styles/style_task_info.css'
import React, {useLayoutEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import AdditionEntity from "../../task_form/addition/entity/addition_entity";
import {getFileType} from "../../../../actions/strings";

export default function TaskInfo(props){
    const [heightInfo, setHeight] = useState(0);
    const infoRef = useRef(null);
    const windowWidth = useSelector(state => state.app.width)
    const fileInputRef = useRef(null);

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

    const handleFileSelect = async (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        console.log(props.id)
        try {
            await addWorkFile(selectedFile, props.id)
        } catch (error) {
            console.log(error);
        }

        event.target.value = null;
    }

    const handleAddFileClick = () => {
        fileInputRef.current.click();
    }

    return (
        <div className='task-info-wrap' style={infoStyle()}>
            <div className='task-info-main' ref={infoRef}>
                {props.isTask &&
                 props.description.length === 0 &&
                 props.additions.length === 0 ?
                     <span className='task-info-text-all task-info-absence'>
                         Дополнительные материалы отсутствуют
                     </span> :
                 props.isTask ?
                     <span className='task-info-default-text task-info-text-all'>
                         {props.description}
                     </span> :
                 props.isWork && props.files.length === 0 &&
                     <span className='task-info-text-all task-info-absence'>
                         Прикрепленные файлы отсутствуют
                     </span>
                }
                {props.isTask &&
                    props.additions.map(addition => (
                        <TaskAddition
                            key={addition.id}
                            id={addition.id}
                            name={addition.title}
                            type={addition.type}
                            content={addition.content}
                        />
                    ))
                }
                {props.isWork &&
                    props.files.map(file => (
                        <AdditionEntity
                            isWorkFile={true}
                            type='file'
                            name={file.filename}
                            content={{fileType: getFileType(file.filename)}}
                            id={file.file_id}
                            key={file.file_id}
                        />
                    ))
                }
                {props.isWork &&
                    <div className='work-btns-wrap'>
                        <div className='work-btns-all add-work-btn'
                             onClick={handleAddFileClick}
                        >
                            <input type="file" ref={fileInputRef}
                                   style={{display: 'none'}}
                                   onChange={handleFileSelect}
                            />
                            <div
                                className='task-info-default-text add-work-text'>
                                Добавить файл
                            </div>
                        </div>
                        <div className='work-btns-all submit-work-btn'>
                            <div
                                className='task-info-default-text submit-work-text'>
                                Сдать работу
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}