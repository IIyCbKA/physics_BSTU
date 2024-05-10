import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {PORTRAIT_ORIENTATION} from "../../../classes/OrientationListener";
import {styles} from "./styles/style_file_header";
import {useDispatch, useSelector} from "react-redux";
import {
    CloseOutlined,
    DeleteOutlined,
    DownloadOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";
import {cleanSelectedInfo} from "../../../reducers/file_reducer";
import {deleteFile, downloadFile} from "../../../actions/files";
import {notification} from 'antd';
import './styles/style_file_header.css'


export default function FileHeader(){
    const [api, contextHolder] = notification.useNotification();
    const userStatus = useSelector(state => state.user.currentUser.status)
    const orientation = useSelector(state => state.app.orientation)
    const selected_id = useSelector(state => state.file.selected_id)
    const selected_name = useSelector(state => state.file.selected_name)
    const selected_type = useSelector(state => state.file.selected_type)
    const dispatch = useDispatch();

    const containerStyle = () => {
        return (orientation === PORTRAIT_ORIENTATION) ?
            styles.containerHeaderMobile : styles.containerHeaderPC;
    }

    function messageNotification(){
        return (
            <div>
                <div className='title'>
                    <span className='title-text'>
                        Имя:
                    </span>
                    <span className='close-btn' onClick={handleCloseNotification}>
                        <CloseOutlined />
                    </span>
                </div>
                <div className='text-name'>
                    {selected_name}
                </div>
            </div>
        )
    }

    const openNotificationWithIcon = () => {
        api["open"]({
            message: messageNotification(),
            placement: 'top',
            duration: 4,
            style: {padding: '8px'},
            closeIcon: false
        });
    };

    const handleClickClose = () => {
        dispatch(cleanSelectedInfo());
    }

    const onDownload = async () => {
        await downloadFile(selected_name, selected_id)
    }

    const onDelete = async () => {
        await deleteFile(selected_id)
        dispatch(cleanSelectedInfo());
    }

    const handleCloseNotification = () => {
        api.destroy()
    }

    const handleInfoClick = () => {
        handleCloseNotification()
        setTimeout(() => {
            openNotificationWithIcon();
        }, 200);
    };

    return(
        <Navbar
            collapseOnSelect
            expand='lg'
            style={styles.navbarFileHeader}
        >
            <Container fluid style={containerStyle()}>
                <Nav style={styles.navStyle}>
                    <div className='bar-left'>
                        <Nav.Item style={styles.navItemStyle} onClick={handleInfoClick}>
                            <InfoCircleOutlined style={styles.iconsStyle}/>
                        </Nav.Item>
                    </div>
                    <div className='bar-right'>
                        {userStatus === 'employee' &&
                            <Nav.Item style={styles.navItemStyle} onClick={onDelete}>
                                <DeleteOutlined style={styles.iconsStyle}/>
                            </Nav.Item>
                        }
                        {selected_type !== 'folder' &&
                            <Nav.Item style={styles.navItemStyle} onClick={onDownload}>
                                <DownloadOutlined style={styles.iconsStyle}/>
                            </Nav.Item>
                        }
                        <Nav.Item style={styles.navItemStyle} onClick={handleClickClose}>
                            <CloseOutlined style={styles.iconsStyle}/>
                        </Nav.Item>
                    </div>
                </Nav>
                {contextHolder}
            </Container>
        </Navbar>
    )
}