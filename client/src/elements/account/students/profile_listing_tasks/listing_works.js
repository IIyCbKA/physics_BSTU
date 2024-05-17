import {useSelector} from "react-redux";
import '../../task_elements/styles/style_task.css'
import Work from "./work/work";
import {useState} from "react";

export default function ListingWork(){
    const tasks = useSelector(state => state.journal.tasks);
    const [activeTaskID, setActiveTask] = useState(null)

    return (
        <div className='listing-task-root'>
            {tasks.map((task, index) => (
                <Work title={task.title}
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