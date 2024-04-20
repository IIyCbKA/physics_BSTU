import {Button} from "react-bootstrap";
import {PlusOutlined} from "@ant-design/icons";
import './styles/style_create_task_btn.css'
import {styles} from './styles/style_create_task_btn'

export default function CreateTask(props){
    const handleClick = (event) => {
        event.preventDefault()
        props.setShow(true)
    }

    return (
        <div className='create_btn_zone'>
            <Button style={styles.btn_style} className='btn-root' onClick={handleClick}>
                <span className='plus-wrap'>
                    <PlusOutlined style={styles.plus_size}/>
                </span>
                <span className='create-btn-text'>
                    Создать
                </span>
            </Button>
        </div>
    )
}