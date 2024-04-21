import './styles/style_addition.css'
import {LinkOutlined, UploadOutlined} from "@ant-design/icons";
import {styles} from './styles/style_addition'
import {Button} from "react-bootstrap";

export default function Addition(){
    return (
        <div className='addition-wrap'>
            <div className='addition-form'>
                <span className='addition-title'>
                    Прикрепить
                </span>
                <div className='addition-buttons-wrap'>
                    <div className='addition-btn-area'>
                        <div className='addition-btn-icon-wrap'>
                            <Button className='addition-btn-style'>
                                <UploadOutlined style={styles.styleIcons}/>
                            </Button>
                        </div>
                        <div className='addition-btn-text-wrap'>
                            Загрузить
                        </div>
                    </div>
                    <div className='addition-btn-area'>
                        <div className='addition-btn-icon-wrap'>
                            <Button className='addition-btn-style'>
                                <LinkOutlined style={styles.styleIcons}/>
                            </Button>
                        </div>
                        <div className='addition-btn-text-wrap'>
                            Ссылка
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}