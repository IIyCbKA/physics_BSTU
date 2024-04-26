import './styles/style_task_form.css'
import HeaderTaskForm
    from "../../../elements/account/task_form/header/header_task_form";
import SelectGroups
    from "../../../elements/account/task_form/select_groups/select_groups";
import Information
    from "../../../elements/account/task_form/information/information";
import Addition
    from "../../../elements/account/task_form/addition/addition";
import {useState} from "react";

export default function TaskForm(props){
    const [selectedGroups, setSelectedGroups] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const isActiveCreateBtn = selectedGroups !== [] && title !== ''
    const [additions, setAdditions] = useState([])
    const [currentId, setCurrentId] = useState(0);

    const nextId = () => {
        setCurrentId(currentId + 1)
        return currentId;
    }

    const formStyle = () => {
        return {opacity: props.show ? 1 : 0,
                visibility: props.show ? 'visible' : 'hidden'
        }
    }

    return (
        <div className='form-wrap' style={formStyle()}>
            <HeaderTaskForm setShow={props.setShow}
                            isActiveBtn={isActiveCreateBtn}
                            groups={selectedGroups}
                            title={title}
                            description={description}
                            additions={additions}
            />
            <div className='main-form'>
                <SelectGroups setSelectedGroups={setSelectedGroups}/>
                <Information setTitle={setTitle}
                             setDescription={setDescription}
                             additions={additions}
                             setAdditions={setAdditions}
                />
                <Addition
                    additions={additions}
                    setAdditions={setAdditions}
                    nextId={nextId}
                />
            </div>
        </div>
    )
}