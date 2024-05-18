import '../../task_elements/styles/style_task.css'
import {useState} from "react";
import TaskMenu from "./menu/task_menu";
import DeleteTaskModal from "./modal/delete_task_modal";
import TaskMain from "../../task_elements/task_main/task_main";
import TaskInfo from "../../task_elements/task_info/task_info";

export default function Task(props){
    const [isShowModal, setShowModal] = useState(false);
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

    const rootStyle = () => {
        if (props.isActive){
            return {boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), ' +
                        '0 2px 6px 2px rgba(60,64,67,.15)',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px'
            }
        }
    }

    return(
        <div className='task-root'
             style={rootStyle()}
             onMouseEnter={() => {if(!isShowModal) setHover(true)}}
             onMouseLeave={() => {setHover(false)}}
        >
            <TaskMain isActive={props.isActive} setActiveID={props.setActiveID}
            title={props.title} isLast={props.isLast} isHover={isHover}
            setHover={setHover} setAnchorEl={setAnchorEl} open={open}
            id={props.id} isTask={true}/>

            <TaskInfo isActive={props.isActive} description={props.description}
            additions={props.additions} isTask={true} id={props.id}/>

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
