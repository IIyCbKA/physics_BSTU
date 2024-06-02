import {Button} from "react-bootstrap";
import './styles/style_create_task_btn.css'
import {styles} from './styles/style_create_task_btn'
import {AddOutlined} from "@mui/icons-material";

const BTN_TEXT = 'Создать'

export default function CreateTask(props){
    const handleClick = (event) => {
        event.preventDefault()
        props.setShow(true)
    }

    return (
        <div className='create_btn_zone'>
            <Button style={styles.btn_style} className='btn-root' onClick={handleClick}>
                <span className='plus-wrap'>
                    <AddOutlined style={styles.plus_size}/>
                </span>
                <span className='create-btn-text'>
                    {BTN_TEXT}
                </span>
            </Button>
        </div>
    )
}