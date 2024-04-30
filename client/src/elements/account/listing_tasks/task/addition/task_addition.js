import './styles/style_task_addition.css'
import {useState} from "react";
import AdditionEntityInfo
    from "../../../task_form/addition/entity/addition_entity_info";
import {downloadTaskFile} from "../../../../../actions/journal";


export default function TaskAddition(props){
    const [isHover, setHover] = useState(false)

    const clickHandle = async () => {
        if (props.type === 'link'){
            window.open(props.name, '_blank');
        } else if (props.type === 'file'){
            await downloadTaskFile(props.name, props.id)
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