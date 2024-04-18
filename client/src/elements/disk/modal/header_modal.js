import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import {styles} from "./styles/style_modal";
import './styles/style_modal.css'

export default function HeaderModal(props){
    return (
        <div style={styles.modalHeader}>
            <span className='modal-header-text'>
                Укажите название папки
            </span>
            <Button icon={<CloseCircleOutlined />}
                    style={styles.closeBtn}
                    onClick={props.handlerClick}/>
        </div>
    )
}