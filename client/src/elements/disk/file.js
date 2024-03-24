import '../../styles/style.css'
import {downloadFile, deleteFile} from "../../actions/files";
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';


export default function File(props){
    const typesList = ['folder', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'pdf',
                       'xls', 'xlsx', 'rar', 'zip', 'pptx', 'mp4']
    const fileType = typesList.includes(props.type) ? props.type : 'other';
    const iconClass = fileType + '-icon'

    const { show } = useContextMenu({
        id: props.id,
    });

    const onDownload = async () => {
        await downloadFile(props.name, props.id)
    }

    const onDelete = async () => {
        await deleteFile(props.id)
    }

    function handleContextMenu(event){
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
             onContextMenu={handleContextMenu}
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
                    >{props.name}
                    </span>
                </div>
            </div>

            <Menu id={props.id}>
                <Item id="download" onClick={onDownload}>Download</Item>
                <Item id="delete" onClick={onDelete}>Delete</Item>
            </Menu>
        </div>
    )
}