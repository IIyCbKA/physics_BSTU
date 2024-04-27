import './styles/style_task.css'
import {BookOutlined} from "@ant-design/icons";
import {styles} from './styles/style_task'

export default function Task(props){
    return(
        <div className='task-root'>
            <div className='task-main'>
                <div className='task-icon-wrap'>
                    <BookOutlined style={styles.iconStyle}/>
                </div>
                <div className='task-title-wrap'>
                    <div className='task-title-text'>
                        {props.title}
                    </div>
                </div>
            </div>
        </div>
    )
}