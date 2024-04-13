import './styles/style_go_back_button.css'
import {styles} from './styles/style_go_back_button'
import {FolderOpenOutlined} from "@ant-design/icons";

export default function GoBackButton({backPath}){
    const text = '..'

    const handleDoubleClick = (event) => {
        event.stopPropagation();
        window.location.href = backPath;
    };

    return(
        <div className="go-back-area" onDoubleClick={handleDoubleClick}>
            <div className='go-back-item-icon'>
                <FolderOpenOutlined style={styles.icon}/>
            </div>
            <div className="go-back-item-info">
                <div className="go-back-item-title">
                    <span
                        className="go-back-clamped-text"
                        aria-hidden={true}
                        title={'Вернуться назад'}
                    >{text}
                    </span>
                </div>
            </div>
        </div>
    )
}
