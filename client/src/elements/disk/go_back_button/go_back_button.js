import './styles/style_go_back_button.css'
import {styles} from './styles/style_go_back_button'
import {FolderOpenOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {PORTRAIT_ORIENTATION} from "../../../classes/OrientationListener";

export default function GoBackButton(props){
    const textMobile = 'Вернуться назад'
    const textPC = '..'
    const orientation = useSelector(state => state.app.orientation)

    const handleClick = (event) => {
        event.stopPropagation();
        if (orientation === PORTRAIT_ORIENTATION)
            window.location.href = props.backPath;
    };

    const handleDoubleClick = (event) => {
        event.stopPropagation();
        window.location.href = props.backPath;
    };

    const iconStyle = () => {
        if (orientation === PORTRAIT_ORIENTATION){
            return styles.iconMobile
        } else{
            return styles.iconPC
        }
    }

    const btnText = () => {
        if (orientation === PORTRAIT_ORIENTATION){
            return textMobile
        } else{
            return textPC
        }
    }

    return(
        <div className="go-back-area"
             onClick={handleClick}
             onDoubleClick={handleDoubleClick}
        >
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
