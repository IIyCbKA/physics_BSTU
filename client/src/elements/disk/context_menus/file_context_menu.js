import {Item, Menu} from "react-contexify";
import 'react-contexify/ReactContexify.css';
import {deleteFile, downloadFile} from "../../../actions/files";
import {CloudDownloadOutlined, DeleteOutlined} from "@ant-design/icons";
import {styles} from "./styles/style_context_menu";
import {useSelector} from "react-redux";
import {employeeStatus} from "../../../reducers/user_reducer";

export default function ContextMenuFile(props){
    const userStatus = useSelector(state => state.user.currentUser.status)
    const onDownload = async () => {
        await downloadFile(props.name, props.id)
    }

    const onDelete = async () => {
        await deleteFile(props.id)
    }

    return (
        (userStatus === employeeStatus || props.type !== 'folder') &&
        <Menu id={props.id}>
            {props.type !== 'folder' &&
                <Item id={"download"}
                      onClick={onDownload}
                >
                    <CloudDownloadOutlined style={styles.styleContextIcon}/>
                        Скачать
                </Item>
            }
            { userStatus === employeeStatus &&
            <Item id="delete"
                  onClick={onDelete}
            >
                <DeleteOutlined style={styles.styleContextIcon}/>
                    Удалить
            </Item>}
        </Menu>
    )
}