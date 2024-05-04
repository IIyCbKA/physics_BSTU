import './styles/style_task_form.css'
import HeaderTaskForm
    from "../../../elements/account/task_form/header/header_task_form";
import SelectGroups
    from "../../../elements/account/task_form/select_groups/select_groups";
import Information
    from "../../../elements/account/task_form/information/information";
import Addition
    from "../../../elements/account/task_form/addition/addition";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {convertRemoteAdditionsToEditFormat, getNextAdditionID} from "../../../actions/journal";

export default function TaskForm(props){
    const [selectedGroups, setSelectedGroups] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const isActiveCreateBtn = selectedGroups !== [] && title !== ''
    const [additions, setAdditions] = useState([])
    const [currentId, setCurrentId] = useState(0);
    const [taskId, setTaskId] = useState(0);
    const task = useSelector(state => state.journal.updatingTask);
    const {setShow} = props

    useEffect(() => {
        if (Object.keys(task).length !== 0) {
            const adds = convertRemoteAdditionsToEditFormat(task.additions)
            setSelectedGroups(task.groups)
            setCurrentId(getNextAdditionID(adds))
            setTitle(task.title)
            setDescription(task.description)
            setAdditions(adds)
            setTaskId(task.id)
            setShow(true)
        } else{
            setSelectedGroups([])
            setCurrentId(0)
            setTitle('')
            setDescription('')
            setTaskId(0)
            setAdditions([])
        }
    }, [task])

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
                            id={taskId}
            />
            <div className='main-form'>
                <SelectGroups setSelectedGroups={setSelectedGroups}
                              groups={selectedGroups}
                />
                <Information setTitle={setTitle}
                             setDescription={setDescription}
                             additions={additions}
                             setAdditions={setAdditions}
                             title={title}
                             description={description}
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
