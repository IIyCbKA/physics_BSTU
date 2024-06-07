import File from "./file";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles/style_disk.css";
import {
  getCurrentFolderName,
  getLastDirectory,
  pathToURL,
} from "../../actions/strings";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { styles } from "./styles/style_disk";
import DiskMenu from "./menu/disk_menu";
import ModalWindow from "./default_modal";
import { EMPLOYEE_USER_STATUS } from "../../constants";
import { generateBreadcrumbItems } from "../../actions/breadcrumb";
import { Breadcrumb } from "antd";
import { isDesktop } from "react-device-detect";

export default function Disk(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const files = useSelector((state) => state.file.files);
  const path = useSelector((state) => state.file.path);
  const userStatus = useSelector((state) => state.user.currentUser.status);
  const backPath = getLastDirectory(path);
  const folderName = getCurrentFolderName(path);
  const [itemsBreadcrumb, setItemsBreadcrumb] = useState([]);

  useEffect(() => {
    setItemsBreadcrumb(generateBreadcrumbItems(path));
  }, [path]);

  const handleGoBackClick = (event) => {
    event.stopPropagation();
    window.location.href = pathToURL(backPath);
  };

  const handleAddClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="storage-main">
      <div className="root-content-inner">
        <div className="root-content-container">
          {isDesktop && itemsBreadcrumb.length > 1 && (
            <div className="breadcrumb-wrap">
              <Breadcrumb items={itemsBreadcrumb} separator=">" />
            </div>
          )}
          <div className="disk-head">
            {backPath !== "" && (
              <div className="go-btn-div" onClick={handleGoBackClick}>
                <ArrowLeftOutlined
                  style={styles.diskHeadIconStyle}
                  className="disk-head-btn"
                />
              </div>
            )}
            <h1 className="head-text">{folderName}</h1>
            {userStatus === EMPLOYEE_USER_STATUS && (
              <div className="plus-btn-div" onClick={handleAddClick}>
                <PlusOutlined
                  style={styles.diskHeadIconStyle}
                  className="disk-head-btn"
                />
              </div>
            )}
          </div>
          <div className="client-listing">
            <div className="listing-items">
              {files.map((file) => (
                <File
                  name={file.name}
                  size={file.file_size}
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
        openNotification={props.openNotification}
      />
      {isModalOpen && (
        <ModalWindow
          show={isModalOpen}
          setModalOpen={setModalOpen}
          setAnchorEl={setAnchorEl}
          openNotification={props.openNotification}
        />
      )}
    </div>
  );
}
