import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {styles} from "./styles/style_file_header";
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined, FileDownloadOutlined, CloseOutlined}
    from "@mui/icons-material"
import {cleanSelectedInfo} from "../../../reducers/file_reducer";
import {deleteFile, downloadFile} from "../../../actions/files";
import './styles/style_file_header.css'
import {useLayoutEffect, useRef, useState} from "react";
import {minimizeStrPortrait} from "../../../actions/strings";
import {
    EMPLOYEE_USER_STATUS,
    FILE_TYPE_FOLDER,
    PORTRAIT_ORIENTATION
} from "../../../constants";
import DropdownFileInfo from "./dropdown_file_info";


export default function FileHeader(){
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
        if (selected_name !== null){
            minimizeStrPortrait(selected_name, textZoneSize,
                textFieldRef.current);
        }
    }, [textZoneSize, selected_name, textFieldRef]);

    const containerStyle = () => {
        return (orientation === PORTRAIT_ORIENTATION) ?
            styles.containerHeaderMobile : styles.containerHeaderPC;
    }

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

    return(
        <Navbar
            collapseOnSelect
            expand='lg'
            style={styles.navbarFileHeader}
        >
            <Container fluid style={containerStyle()}>
                <Nav style={styles.navStyle}>
                    <div className='bar-left'>
                        <DropdownFileInfo/>
                    </div>
                    <div className='bar-right' ref={barRightRef}>
                        <div className='bar-right-text-zone' ref={textZoneRef}>
                            <div className='bar-text-wrap' ref={textWrapRef}>
                                <span className='bar-text' ref={textFieldRef}>
                                </span>
                            </div>
                        </div>
                        <div className='bar-right-icons-zone' ref={iconZoneRef}>
                            {userStatus === EMPLOYEE_USER_STATUS &&
                                <Nav.Item
                                    style={styles.navItemStyle}
                                    onClick={onDelete}
                                >
                                    <DeleteOutlined style={styles.iconsStyle}/>
                                </Nav.Item>
                            }
                            {((selected_type !== FILE_TYPE_FOLDER &&
                            selected_type) || (!selected_type &&
                            type_last_closed !== FILE_TYPE_FOLDER)) &&
                                <Nav.Item
                                    style={styles.navItemStyle}
                                    onClick={onDownload}
                                >
                                    <FileDownloadOutlined
                                        style={styles.iconsStyle}
                                    />
                                </Nav.Item>
                            }
                            <Nav.Item
                                style={styles.navItemStyle}
                                onClick={handleClickClose}
                            >
                                <CloseOutlined style={styles.iconsStyle}/>
                            </Nav.Item>
                        </div>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}