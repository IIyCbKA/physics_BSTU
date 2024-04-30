import {useSelector} from "react-redux";
import './styles/style_listing_task.css'
import Task from "./task/task";
import {useState} from "react";

export default function ListingTask(){
    const tasks = useSelector(state => state.journal.tasks);
    const [activeTaskID, setActiveTask] = useState(null)

    return (
        <div className='listing-task-root'>
            {tasks.map((task, index) => (
                <Task title={task.title}
                      description={task.description}
                      additions={task.additions}
                      id={task.id}
                      key={task.id}
                      isLast={index === tasks.length - 1}
                      isActive={activeTaskID === task.id}
                      setActiveID={setActiveTask}
                />
            ))}
        </div>
    )
}