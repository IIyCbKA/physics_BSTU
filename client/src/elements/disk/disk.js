import File from "./file";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import './styles/style_disk.css'
import {getCurrentFolderName, getLastDirectory} from "../../actions/strings";
import {employeeStatus} from "../../reducers/user_reducer";
import {ArrowLeftOutlined, PlusOutlined} from "@ant-design/icons";
import {styles} from './styles/style_disk'
import DiskMenu from "./menu/disk_menu";
import ModalWindow from "./default_modal";

export default function Disk() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const files = useSelector(state => state.file.files)
    const path = useSelector(state => state.file.path)
    const userStatus = useSelector(state => state.user.currentUser.status)
    const backPath = getLastDirectory(path)
    const folderName = getCurrentFolderName(path)

    const handleGoBackClick = (event) => {
        event.stopPropagation();
        window.location.href = backPath;
    }

    const handleAddClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    }

    return (
        <div className='storage-main'>
            <div className="root-content-inner">
                <div className="root-content-container">
                    <div className="disk-head">
                        {backPath !== '' &&
                            <div className='go-btn-div' onClick={handleGoBackClick}>
                                <ArrowLeftOutlined
                                    style={styles.diskHeadIconStyle}
                                    className='disk-head-btn'
                                />
                            </div>
                        }
                        <h1 className="head-text">
                            {folderName}
                        </h1>
                        {userStatus === employeeStatus &&
                            <div className='plus-btn-div' onClick={handleAddClick}>
                                <PlusOutlined
                                    style={styles.diskHeadIconStyle}
                                    className='disk-head-btn'
                                />
                            </div>
                        }
                    </div>
                    <div className="client-listing">
                        <div className="listing-items">
                            {files.map(file => (
                                <File name={file.name}
                                      type={file.type}
                                      id={file.id}
                                      key={file.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <DiskMenu
                open={open}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                setModalShow={setModalOpen}
            />
            {isModalOpen &&
                <ModalWindow
                    show={isModalOpen}
                    setModalOpen={setModalOpen}
                    setAnchorEl={setAnchorEl}
                />
            }
        </div>
    )
}