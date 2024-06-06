import './styles/style_forms_header.css'
import {CloseOutlined} from "@ant-design/icons";
import {styles} from './styles/style_forms_header'
import {Button} from "react-bootstrap";
import {createTask, updateTask} from "../../../actions/journal";
import {AssignmentOutlined, Group} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setUpdatingTask} from "../../../reducers/journal_reducer";
import {useState} from "react";
import {
    NOTIFICATION_ERROR_DEFAULT_TITLE,
    NOTIFICATION_ERROR_STATUS,
    NOTIFICATION_SUCCESS_STATUS
} from "../../../constants";

const BTN_LOADING_TEXT = 'В процессе...'
const BTN_UPDATING_TEXT = 'Сохранить'
const BTN_CREATE_TEXT = 'Создать'
const TASK_FORM_TITLE_TEXT = 'Задание'
const SUCCESS_TASK_FORM_STATUS = 200
const SUCCESS_UPDATE_TASK_TITLE = 'Задание успешно обновлено'
const SUCCESS_CREATE_TASK_TITLE = 'Задание успешно создано'

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
            const status = await updateTask(task);

            if (status === SUCCESS_TASK_FORM_STATUS){
                props.openNotification(NOTIFICATION_SUCCESS_STATUS,
                    SUCCESS_UPDATE_TASK_TITLE,
                    'Задание было успешно обновлено.')
                props.setShow(false)
                setTimeout(() => {
                    dispatch(setUpdatingTask({}));
                }, 500)
            } else {
                props.openNotification(NOTIFICATION_ERROR_STATUS,
                    NOTIFICATION_ERROR_DEFAULT_TITLE, `Задание '${task.title}' 
                    не было обновлено. Повторите попытку позже.`)
            }
        } else {
            const status = await createTask(task);
            if (status === SUCCESS_TASK_FORM_STATUS){
                props.openNotification(NOTIFICATION_SUCCESS_STATUS,
                    SUCCESS_CREATE_TASK_TITLE, 'Задание было успешно создано.')
                props.setShow(false)
                setTimeout(() => {
                    dispatch(setUpdatingTask({}))
                }, 500)
            } else {
                props.openNotification(NOTIFICATION_ERROR_STATUS,
                    NOTIFICATION_ERROR_DEFAULT_TITLE, `Задание '${task.title}' 
                    не было создано. Повторите попытку позже.`)
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