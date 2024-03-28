import '../../styles/style.css'
import { useContextMenu } from 'react-contexify';
import ContextMenuFile from "./file_context_menu";
import {minimizeStr} from "../../actions/strings";

export default function File(props){
    const typesList = ['folder', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'pdf',
                       'xls', 'xlsx', 'rar', 'zip', 'pptx', 'mp4']
    const fileType = typesList.includes(props.type) ? props.type : 'other';
    const iconClass = fileType + '-icon'

    const { show } = useContextMenu({
        id: props.id,
    });

    function handleFileContextMenu(event){
        event.stopPropagation();
        show({
            event,
            props: {
                key: 'value'
            }
        })
    }

    const handleClick = (event) => {
        event.stopPropagation()
    };

    return(
        <div className="file-area"
             onContextMenu={handleFileContextMenu}
             onClick={handleClick}
        >
            <div className="item-icon">
                <div className="icon-wrapper">
                    <span className={'file-icon file-icon-size icon-contain ' +
                        iconClass}></span>
                </div>
            </div>
            <div className="item-info">
                <div className="item-title">
                    <span
                        className="clamped-text"
                        aria-hidden={true}
                        title={props.name}
                    >{minimizeStr(props.name, 22, 2)}
                    </span>
                </div>
            </div>
            <ContextMenuFile id={props.id} name={props.name} type={props.type}/>
        </div>
    )
}
