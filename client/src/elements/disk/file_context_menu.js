import {Item, Menu} from "react-contexify";
import 'react-contexify/ReactContexify.css';
import {deleteFile, downloadFile} from "../../actions/files";
import './styles/style_disk.css'
import {CloudDownloadOutlined, DeleteOutlined} from "@ant-design/icons";
import {styles} from "./styles/style_disk";

export default function ContextMenuFile(props){
    const onDownload = async () => {
        await downloadFile(props.name, props.id)
    }

    const onDelete = async () => {
        await deleteFile(props.id)
    }

    return (
        <Menu id={props.id}>
            {props.type !== 'folder' &&
                <Item id={"download"}
                      onClick={onDownload}
                >
                    <CloudDownloadOutlined style={styles.styleContextIcon}/>
                        Скачать
                </Item>
            }
            <Item id="delete"
                  onClick={onDelete}
            >
                <DeleteOutlined style={styles.styleContextIcon}/>
                    Удалить
            </Item>
        </Menu>
    )
}