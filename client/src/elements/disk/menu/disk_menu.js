import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { uploadFile } from "../../../actions/files";
import { useSelector } from "react-redux";
import React, { useRef } from "react";
import MenuItemDefault from "../../pages_menu/items_pattern";
import {
  NOTIFICATION_ERROR_DEFAULT_TITLE,
  NOTIFICATION_ERROR_STATUS,
  NOTIFICATION_SUCCESS_STATUS,
} from "../../../constants";

const CREATE_FOLDER_ITEM_TEXT = "Создать папку";
const ADD_FILE_ITEM_TEXT = "Добавить файл";
const SUCCESS_TITLE = "Файл успешно добавлен";
const SUCCESS_CREATE_STATUS = 201;

export default function DiskMenu(props) {
  const fileInputRef = useRef(null);
  const path = useSelector((state) => state.file.path);

  const handleClose = () => {
    props.setAnchorEl(null);
  };

  const handleAddFileClick = () => {
    fileInputRef.current.click();
  };

  const handleCreateFolderClick = () => {
    props.setModalShow(true);
  };

  const handleFileSelect = async (event) => {
    handleClose();
    const selectedFile = event.target.files[0];
    const status = await uploadFile(selectedFile, path);

    if (status === SUCCESS_CREATE_STATUS) {
      props.openNotification(
        NOTIFICATION_SUCCESS_STATUS,
        SUCCESS_TITLE,
        `Файл '${selectedFile.name}' был добавлен в хранилище.`,
      );
    } else {
      props.openNotification(
        NOTIFICATION_ERROR_STATUS,
        NOTIFICATION_ERROR_DEFAULT_TITLE,
        "При добавлении файла произошла ошибка. Возможно, файл с " +
          "таким именем уже существует. Повторите попытку позже.",
      );
    }

    event.target.value = null;
  };

  return (
    <div style={{ display: "flex" }}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      <Menu
        id="disk-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItemDefault
          onClick={handleCreateFolderClick}
          text={CREATE_FOLDER_ITEM_TEXT}
        />
        <MenuItemDefault
          onClick={handleAddFileClick}
          text={ADD_FILE_ITEM_TEXT}
        />
      </Menu>
    </div>
  );
}
