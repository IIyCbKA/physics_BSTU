import './styles/style_disk.css'
import { useContextMenu } from 'react-contexify';
import ContextMenuFile from "./context_menus/file_context_menu";
import {minimizeStr} from "../../actions/strings";
import {useSelector} from "react-redux";
import {icons} from "./file_icons";
import {styles} from "./styles/style_disk";
import {PORTRAIT_ORIENTATION, LANDSCAPE_ORIENTATION} from "../../classes/OrientationListener";

export default function File(props){
    const path = useSelector(state => state.file.path)
    const orientation = useSelector(state => state.app.orientation)

    const { show } = useContextMenu({
        id: props.id,
    });

    const showContextMenu = (event) => {
        event.preventDefault()
        show({
            event,
            props: {
                key: 'value'
            }
        })
    }

    const handleFileClick = (event) => {
        event.stopPropagation();
        if (orientation === LANDSCAPE_ORIENTATION) {
            if (props.type !== 'folder')
                showContextMenu(event)
        } else {
            if (props.type !== 'folder')
                showContextMenu(event)
            else
                window.location.href = path + props.name + '\\'
        }
    }

    const handleFileContextMenu = (event) => {
        event.stopPropagation();
        showContextMenu(event);
    }

    const handleFileDoubleClick = (event) => {
        event.stopPropagation();
        if (props.type === 'folder') {
            window.location.href = path + props.name + '\\';

        }

    }

    const iconStyle = () => {
        if (orientation === PORTRAIT_ORIENTATION){
            return styles.iconMobile
        } else{
            return styles.iconPC
        }
    }

    return(
        <div className="file-area"
             onClick={handleFileClick}
             onDoubleClick={handleFileDoubleClick}
             onContextMenu={handleFileContextMenu}
        >
            <div className="item-icon">
                <div className="icon-wrapper">
                    <span
                        style={iconStyle()}
                        className='file-icon file-icon-size icon-contain'
                    >
                        {props.type in icons ?
                            icons[props.type] :
                            icons['other']}
                    </span>
                </div>
            </div>
            <div className="item-info">
                <div className="item-title">
                    <span
                        className="clamped-text"
                        aria-hidden={true}
                        title={props.name}
                    >{minimizeStr(
                        props.name,
                        orientation === PORTRAIT_ORIENTATION ? 32 : 22,
                        2)}
                    </span>
                </div>
            </div>
            <ContextMenuFile id={props.id} name={props.name} type={props.type}/>
        </div>
    )
}
