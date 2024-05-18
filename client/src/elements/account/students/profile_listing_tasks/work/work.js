import '../../../task_elements/styles/style_task.css'
import TaskMain from "../../../task_elements/task_main/task_main";
import TaskInfo from "../../../task_elements/task_info/task_info";

export default function Work(props){
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
        >
            <TaskMain isActive={props.isActive} setActiveID={props.setActiveID}
                      title={props.title} isLast={props.isLast} id={props.id}
                      isWork={true}
            />

            <TaskInfo isActive={props.isActive} files={props.files} 
            isWork={true} id={props.id}/>
        </div>
    )
}
