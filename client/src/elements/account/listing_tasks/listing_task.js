import {useSelector} from "react-redux";
import '../common_styles/common_account_styles.css'
import Task from "../../../utils/task/task";
import {useState} from "react";

export default function ListingTask(props){
    const tasks = useSelector(state => state.journal.tasks);
    const [activeTaskID, setActiveTask] = useState(null)

    return (
        <div className='listing-account-root'>
            {tasks.map((task, index) => (
                <Task title={task.title}
                      description={task.description}
                      additions={task.additions}
                      groups={task.groups}
                      id={task.id}
                      key={task.id}
                      isLast={index === tasks.length - 1}
                      isActive={activeTaskID === task.id}
                      setActiveID={setActiveTask}
                      openNotification={props.openNotification}
                />
            ))}
        </div>
    )
}