import './styles/style_disk.css'
import { useContextMenu } from 'react-contexify';
import ContextMenuFile from "./file_context_menu";
import {minimizeStr} from "../../actions/strings";
import {useSelector} from "react-redux";
import {
    FileExcelOutlined,
    FileImageOutlined,
    FileOutlined,
    FilePdfOutlined,
    FilePptOutlined,
    FileWordOutlined,
    FileZipOutlined,
    FolderOutlined
} from "@ant-design/icons";
import {styles} from './styles/style_disk'

const components = {
    'folder': <FolderOutlined style={styles.styleFolderIcon}/>,
    'docx': <FileWordOutlined style={styles.styleDocIcon}/>,
    'doc': <FileWordOutlined style={styles.styleDocIcon}/>,
    'png': <FileImageOutlined style={styles.styleImageIcon}/>,
    'jpg': <FileImageOutlined style={styles.styleImageIcon}/>,
    'jpeg': <FileImageOutlined style={styles.styleImageIcon}/>,
    'pdf': <FilePdfOutlined style={styles.stylePdfIcon}/>,
    'xls': <FileExcelOutlined style={styles.styleExcelIcon}/>,
    'xlsx': <FileExcelOutlined style={styles.styleExcelIcon}/>,
    'rar': <FileZipOutlined style={styles.styleArchiveIcon}/>,
    'zip': <FileZipOutlined style={styles.styleArchiveIcon}/>,
    'pptx': <FilePptOutlined style={styles.stylePresentationIcon}/>,
    'other': <FileOutlined style={styles.styleOtherIcon}/>
}

export default function File(props){
    const path = useSelector(state => state.file.path)

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
        if (props.type === 'folder')
            window.location.href = path + props.name + '\\';
    };

    return(
        <div className="file-area"
             onContextMenu={handleFileContextMenu}
             onClick={handleClick}
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
