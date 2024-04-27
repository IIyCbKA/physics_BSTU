import {useSelector} from "react-redux";
import './styles/style_listing_task.css'
import React, {useEffect} from "react";
import Task from "./task/task";

export default function ListingTask(){
    const tasks = useSelector(state => state.journal.tasks);

    useEffect(() => {
        const taskElements = document.querySelectorAll('.task-main');
        if (taskElements.length > 0){
            const lastTask = taskElements[taskElements.length - 1];
            lastTask.style.borderBottom = 'none';
        }
    }, [tasks]);

    return (
        <div className='listing-task-root'>
            {tasks.map(task => (
                <Task title={task.title}
                      description={task.description}
                      id={task.id}
                      key={task.id}
                />
            ))}
        </div>
    )
}