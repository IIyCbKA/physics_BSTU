import './styles/style_task_addition.css'
import {useState} from "react";
import AdditionEntityInfo
    from "../../../task_form/addition/entity/addition_entity_info";


export default function TaskAddition(props){
    const [isHover, setHover] = useState(false)

    const clickHandle = () => {
        if (props.type === 'link'){
            window.open(props.name, '_blank');
        } else if (props.type === 'file'){
            // тут нужно начинать скачивание файла (по props.id)
        }
    }

    return (
        <div className='task-addition-wrap' onClick={clickHandle}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >
            <AdditionEntityInfo {...props} isHover={isHover}/>
        </div>
    )
}