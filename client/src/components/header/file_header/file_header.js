import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {PORTRAIT_ORIENTATION} from "../../../classes/OrientationListener";
import {styles} from "./styles/style_file_header";
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined, FileDownloadOutlined, CloseOutlined, InfoOutlined}
    from "@mui/icons-material"
import {cleanSelectedInfo} from "../../../reducers/file_reducer";
import {deleteFile, downloadFile} from "../../../actions/files";
import {notification} from 'antd';
import './styles/style_file_header.css'
import {useLayoutEffect, useRef, useState} from "react";
import {minimizeStrPortrait} from "../../../actions/strings";


export default function FileHeader(){
    const [api, contextHolder] = notification.useNotification();
    const userStatus = useSelector(state => state.user.currentUser.status)
    const orientation = useSelector(state => state.app.orientation)
    const selected_id = useSelector(state => state.file.selected_id)
    const selected_name = useSelector(state => state.file.selected_name)
    const selected_type = useSelector(state => state.file.selected_type)
    const type_last_closed = useSelector(state => state.file.type_last_closed)
    const [textZoneSize, setTextZoneSize] = useState(0);
    const [iconZoneSize, setIconZoneSize] = useState(0);
    const widthWindow = useSelector(state => state.app.width)
    const barRightRef = useRef(null);
    const textZoneRef = useRef(null);
    const textWrapRef = useRef(null);
    const textFieldRef = useRef(null);
    const iconZoneRef = useRef(null);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        setIconZoneSize(iconZoneRef.current.offsetWidth);
    }, [selected_id]);

    useLayoutEffect(() => {
        textZoneRef.current.style.width = `${barRightRef.current.offsetWidth - 
        iconZoneSize}px`
        setTextZoneSize(textWrapRef.current.offsetWidth)
    }, [widthWindow, iconZoneSize]);

    useLayoutEffect(() => {
        minimizeStrPortrait(selected_name, textZoneSize, textFieldRef.current);
    }, [textZoneSize, selected_name, textFieldRef]);

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
                            <InfoOutlined style={styles.iconsStyle}/>
                        </Nav.Item>
                    </div>
                    <div className='bar-right' ref={barRightRef}>
                        <div className='bar-right-text-zone' ref={textZoneRef}>
                            <div className='bar-text-wrap' ref={textWrapRef}>
                                <span className='bar-text' ref={textFieldRef}>
                            </span>
                            </div>
                        </div>
                        <div className='bar-right-icons-zone' ref={iconZoneRef}>
                            {userStatus === 'employee' &&
                                <Nav.Item style={styles.navItemStyle} onClick={onDelete}>
                                    <DeleteOutlined style={styles.iconsStyle}/>
                                </Nav.Item>
                            }
                            {((selected_type !== 'folder' && selected_type) ||
                                    (!selected_type && type_last_closed !== 'folder')) &&
                                <Nav.Item style={styles.navItemStyle} onClick={onDownload}>
                                    <FileDownloadOutlined style={styles.iconsStyle}/>
                                </Nav.Item>
                            }
                            <Nav.Item style={styles.navItemStyle} onClick={handleClickClose}>
                                <CloseOutlined style={styles.iconsStyle}/>
                            </Nav.Item>
                        </div>
                    </div>
                </Nav>
                {contextHolder}
            </Container>
        </Navbar>
    )
}