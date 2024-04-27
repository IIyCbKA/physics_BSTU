import {useSelector} from "react-redux";
import './styles/style_listing_task.css'
import Task from "./task/task";

export default function ListingTask(){
    const tasks = useSelector(state => state.journal.tasks);

    return (
        <div className='listing-task-root'>
            {tasks.map((task, index) => (
                <Task title={task.title}
                      description={task.description}
                      id={task.id}
                      key={task.id}
                      isLast={index === tasks.length - 1}
                />
            ))}
        </div>
    )
}