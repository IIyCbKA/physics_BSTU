import './styles/style_task_form.css'
import HeaderTaskForm
    from "../../../elements/account/task_form/header/header_task_form";
import SelectGroups
    from "../../../elements/account/task_form/select_groups/select_groups";
import Information
    from "../../../elements/account/task_form/information/information";
import Addition
    from "../../../elements/account/task_form/addition/addition";

export default function TaskForm(props){
    const formStyle = () => {
        return {opacity: props.show ? 1 : 0,
                visibility: props.show ? 'visible' : 'hidden'
        }
    }

    return (
        <div className='form-wrap' style={formStyle()}>
            <HeaderTaskForm setShow={props.setShow}/>
            <div className='main-form'>
                <SelectGroups/>
                <Information/>
                <Addition/>
            </div>
        </div>
    )
}