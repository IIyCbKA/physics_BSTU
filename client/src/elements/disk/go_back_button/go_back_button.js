import './styles/style_go_back_button.css'
import {styles} from './styles/style_go_back_button'
import {FolderOpenOutlined} from "@ant-design/icons";

export default function GoBackButton(){
    const text = '..'

    const handleDoubleClick = (event) => {
        event.stopPropagation();
    };

    return(
        <div className="go-back-area" onDoubleClick={handleDoubleClick}>
            <div className='item-icon'>
                <FolderOpenOutlined style={styles.icon}/>
            </div>
            <div className="item-info">
                <div className="item-title">
                    <span
                        className="clamped-text"
                        aria-hidden={true}
                        title={'Вернуться назад'}
                    >{text}
                    </span>
                </div>
            </div>
        </div>
    )
}
