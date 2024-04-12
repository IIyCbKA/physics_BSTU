import './styles/style_disk.css'
import { useContextMenu } from 'react-contexify';
import ContextMenuFile from "./context_menus/file_context_menu";
import {minimizeStr} from "../../actions/strings";
import {useSelector} from "react-redux";
import {
    FileExcelFilled,
    FileFilled,
    FileImageFilled,
    FilePdfFilled,
    FilePptFilled,
    FileWordFilled,
    FileZipFilled,
    FolderFilled,
} from "@ant-design/icons";
import {styles} from './styles/style_disk'

const components = {
    'folder': <FolderFilled style={styles.styleFolderIcon}/>,
    'docx': <FileWordFilled style={styles.styleDocIcon}/>,
    'doc': <FileWordFilled style={styles.styleDocIcon}/>,
    'png': <FileImageFilled style={styles.styleImageIcon}/>,
    'jpg': <FileImageFilled style={styles.styleImageIcon}/>,
    'jpeg': <FileImageFilled style={styles.styleImageIcon}/>,
    'pdf': <FilePdfFilled style={styles.stylePdfIcon}/>,
    'xls': <FileExcelFilled style={styles.styleExcelIcon}/>,
    'xlsx': <FileExcelFilled style={styles.styleExcelIcon}/>,
    'rar': <FileZipFilled style={styles.styleArchiveIcon}/>,
    'zip': <FileZipFilled style={styles.styleArchiveIcon}/>,
    'pptx': <FilePptFilled style={styles.stylePresentationIcon}/>,
    'other': <FileFilled style={styles.styleOtherIcon}/>
}

export default function File(props){
    const path = useSelector(state => state.file.path)
    let clickCount = 0;

    const { show } = useContextMenu({
        id: props.id,
    });

    const showContextMenu = (event) => {
        show({
            event,
            props: {
                key: 'value'
            }
        })
    }

    const handleFileClick = (event) => {
        event.stopPropagation();
        if (props.type === 'folder'){
            clickCount += 1
            setTimeout(() => {
                if (clickCount === 1) {
                    showContextMenu(event)
                } else if (clickCount > 1){
                    window.location.href = path + props.name + '\\';
                }
                clickCount = 0
            }, 300);
        } else{
            showContextMenu(event)
        }
    }

    return(
        <div className="file-area"
             onClick={handleFileClick}
        >
            <div className="item-icon">
                <div className="icon-wrapper">
                    <span className='file-icon file-icon-size icon-contain '>
                        {props.type in components ?
                            components[props.type] :
                            components['other']}
                    </span>
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
