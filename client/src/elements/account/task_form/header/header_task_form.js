import './styles/style_header_task_form.css'
import {BookOutlined, CloseOutlined} from "@ant-design/icons";
import {styles} from './styles/style_header_task_form'
import {Button} from "react-bootstrap";
import {createTask} from "../../../../actions/journal";

export default function HeaderTaskForm(props){
    const handleCloseClick = (event) => {
        event.preventDefault()
        props.setShow(false)
    }

    const handleCreateTaskClick = async (event) => {
        event.preventDefault()
        const task = {
            title: props.title,
            description: props.description,
            groups: props.groups,
            additions: props.additions
        }

        console.log(task)
        await createTask(task)
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
                    <BookOutlined style={styles.iconHeader}/>
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
                            Создать задание
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}