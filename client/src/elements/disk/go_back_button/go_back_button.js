import './styles/style_go_back_button.css'
import {styles} from './styles/style_go_back_button'
import {FolderOpenOutlined} from "@ant-design/icons";

export default function GoBackButton(props){
    const textMobile = 'Вернуться назад'
    const textPC = '..'

    const handleClick = (event) => {
        event.stopPropagation();
        window.location.href = props.backPath;
    };

    const iconStyle = () => {
        if (props.orientation === 'portrait'){
            return styles.iconMobile
        } else{
            return styles.iconPC
        }
    }

    const btnText = () => {
        if (props.orientation === 'portrait'){
            return textMobile
        } else{
            return textPC
        }
    }

    return(
        <div className="go-back-area" onClick={handleClick}>
            <div className='go-back-item-icon'>
                <FolderOpenOutlined style={iconStyle()}/>
            </div>
            <div className="go-back-item-info">
                <div className="go-back-item-title">
                    <span
                        className="go-back-clamped-text"
                        aria-hidden={true}
                        title={'Вернуться назад'}
                    >{btnText()}
                    </span>
                </div>
            </div>
        </div>
    )
}
