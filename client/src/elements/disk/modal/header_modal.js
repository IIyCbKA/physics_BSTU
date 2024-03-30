import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import {styles} from "./styles/style";
import './styles/style.css'

export default function HeaderModal(props){
    return (
        <div style={styles.modalHeader}>
            <span>
                Укажите название папки
            </span>
            <Button icon={<CloseCircleOutlined />}
                    style={styles.closeBtn}
                    onClick={props.handlerClick}/>
        </div>
    )
}