import './styles/style_header_task_form.css'
import {CloseOutlined} from "@ant-design/icons";
import {styles} from './styles/style_header_task_form'
import {Button} from "react-bootstrap";
import {createTask, updateTask} from "../../../../actions/journal";
import {AssignmentOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setUpdatingTask} from "../../../../reducers/journal_reducer";

export default function HeaderTaskForm(props){
    const uTask = useSelector(state => state.journal.updatingTask)
    const dispatch = useDispatch()
    const handleCloseClick = (event) => {
        event.preventDefault()
        props.setShow(false)
        dispatch(setUpdatingTask({}))
    }

    const isUpdated = Object.keys(uTask).length !== 0;

    const buttonText = isUpdated ? 'Редактировать': 'Создать'

    const handleCreateTaskClick = async (event) => {
        event.preventDefault()
        const task = {
            id: props.id,
            title: props.title,
            description: props.description,
            groups: props.groups,
            additions: props.additions
        }

        if (isUpdated){
            const result = await updateTask(task);
            if (result.status === 200){
                props.setShow(false)
            }
            await dispatch(updateTask({}));
        } else {
            const result = await createTask(task);
            if (result.status === 200){
                props.setShow(false)
            }
        }
    }

    return (
        <div className='header-form'>
            <div className='close-wrap'>
                <div className='close-zone' onClick={handleCloseClick}>
                    <CloseOutlined style={styles.iconClose}/>
                </div>
            </div>
            <div className='header-info'>
                <div className='header-icon-wrap'>
                    <AssignmentOutlined style={styles.iconHeader}/>
                </div>
                <span className='header-text'>
                    Задание
                </span>
            </div>
            <div className='create-wrap'>
                <div className='create-btn-wrap'>
                    <Button style={styles.btnCreate}
                            disabled={!props.isActiveBtn}
                            onClick={handleCreateTaskClick}>
                        <span className='create-task-btn-text'>
                            {buttonText}
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}