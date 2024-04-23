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
    const [files, setFiles] = useState([])
    const [links, setLinks] = useState([])

    const formStyle = () => {
        return {opacity: props.show ? 1 : 0,
                visibility: props.show ? 'visible' : 'hidden'
        }
    }

    return (
        <div className='form-wrap' style={formStyle()}>
            <HeaderTaskForm setShow={props.setShow}
                            isActiveBtn={isActiveCreateBtn}
            />
            <div className='main-form'>
                <SelectGroups setSelectedGroups={setSelectedGroups}/>
                <Information setTitle={setTitle}
                             setDescription={setDescription}
                             files={files}
                             links={links}
                />
                <Addition
                    links={links}
                    setLinks={setLinks}
                    files={files}
                    setFiles={setFiles}
                />
            </div>
        </div>
    )
}