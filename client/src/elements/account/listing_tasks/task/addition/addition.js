import './styles/style_task_addition.css'
import {useState} from "react";

export default function TaskAddition(props){
    const [isHover, setHover] = useState(false)

    return (
        <div className='task-addition-wrap'
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >

        </div>
    )
}