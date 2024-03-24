import '../../styles/style.css'
import {downloadFile, deleteFile} from "../../actions/files";

export default function File(props){
    const typesList = ['folder', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'pdf',
                       'xls', 'xlsx', 'rar', 'zip', 'pptx', 'mp4']
    const fileType = typesList.includes(props.type) ? props.type : 'other';
    const iconClass = fileType + '-icon'

    const onDownload = async (e) => {
        e.stopPropagation()
        await downloadFile(props.name, props.id)
    }

    const onDelete = async (e) => {
        e.stopPropagation()
        await deleteFile(props.id)
    }

    return(
        <div className="file-area"
             onClick={onDownload}
             onContextMenu={onDelete}
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
        </div>
    )
}