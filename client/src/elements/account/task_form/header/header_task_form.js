import './styles/style_header_task_form.css'
import {BookOutlined, CloseOutlined} from "@ant-design/icons";
import {styles} from './styles/style_header_task_form'
import {Button} from "react-bootstrap";

export default function HeaderTaskForm(props){
    const handleCloseClick = (event) => {
        event.preventDefault()
        props.setShow(false)
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
                            disabled={!props.isActiveBtn}>
                        <span className='create-task-btn-text'>
                            Создать задание
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}