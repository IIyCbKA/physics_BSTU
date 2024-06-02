import './styles/style_forms_header.css'
import {CloseOutlined} from "@ant-design/icons";
import {styles} from './styles/style_forms_header'
import {Button} from "react-bootstrap";
import {createTask, updateTask} from "../../../actions/journal";
import {AssignmentOutlined, Group} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setUpdatingTask} from "../../../reducers/journal_reducer";
import {useState} from "react";

const BTN_LOADING_TEXT = 'В процессе...'
const BTN_UPDATING_TEXT = 'Сохранить'
const BTN_CREATE_TEXT = 'Создать'
const TASK_FORM_TITLE_TEXT = 'Задание'

export default function FormsHeader(props){
    const [isLoading, setLoading] = useState(false)
    const uTask = useSelector(state => state.journal.updatingTask)
    const journalGroupName = useSelector(state => state.selectedGroup.groupName)
    const dispatch = useDispatch()

    const handleCloseClick = (event) => {
        event.preventDefault()
        props.setShow(false)
        if (props.isCreateTaskForm){
            setTimeout(() => {
                dispatch(setUpdatingTask({}))
            }, 500)
        } else if (props.isJournal && props.tableContainerRef.current){
            setTimeout(() => {
                props.tableContainerRef.current.scrollTop = 0;
                props.tableContainerRef.current.scrollLeft = 0;
            }, 500)
        }
    }

    const isUpdated = Object.keys(uTask).length !== 0;

    const buttonText = isLoading ? BTN_LOADING_TEXT : (
        isUpdated ? BTN_UPDATING_TEXT: BTN_CREATE_TEXT)

    const handleCreateTaskClick = async (event) => {
        event.preventDefault()
        setLoading(true)
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
            setTimeout(() => {
                dispatch(setUpdatingTask({}));
            }, 500)
        } else {
            const result = await createTask(task);
            if (result.status === 200){
                props.setShow(false)
                setTimeout(() => {
                    dispatch(setUpdatingTask({}))
                }, 500)
            }
        }

        setTimeout(() => {
            setLoading(false);
        }, 500)
    }

    return (
        <div className='header-form'>
            <div className='close-wrap'>
                <div className='close-zone' onClick={handleCloseClick}>
                    <CloseOutlined style={styles.iconClose}/>
                </div>
            </div>
            <div className={props.isCreateTaskForm ? 'header-info' :
                'header-journal-info'}>
                <div className='header-icon-wrap'>
                    {props.isCreateTaskForm ?
                        <AssignmentOutlined style={styles.iconHeader}/> :
                        <Group style={styles.iconHeader}/>
                    }
                </div>
                <span className='header-text'>
                    {props.isCreateTaskForm ?
                        TASK_FORM_TITLE_TEXT :
                        journalGroupName
                    }
                </span>
            </div>
            {props.isCreateTaskForm &&
                <div className='create-wrap'>
                    <div className='create-btn-wrap'>
                        <Button style={styles.btnCreate}
                                disabled={!props.isActiveBtn || isLoading}
                                onClick={handleCreateTaskClick}>
                        <span className='create-task-btn-text'>
                            {buttonText}
                        </span>
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}