import { Drawer } from "antd";
import { useState } from "react";
import { styles } from "./styles/style_file_header";
import { InfoOutlined } from "@mui/icons-material";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { formatFileSize } from "../../../actions/files";
import {
  FILE_INFO_NAME_TITLE,
  FILE_INFO_SIZE_TITLE,
  FILE_TYPE_FOLDER,
} from "../../../constants";
import "./styles/style_file_header.css";

const FOLDERS_TITLE = "Информация о папке";
const FILES_TITLE = "Информация о файле";

export default function DrawerFileInfo() {
  const selected_name = useSelector((state) => state.file.selected_name);
  const selected_type = useSelector((state) => state.file.selected_type);
  const selected_size = useSelector((state) => state.file.selected_size);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Nav.Item style={styles.navItemStyle} onClick={showDrawer}>
        <InfoOutlined style={styles.iconsStyle} />
      </Nav.Item>
      <Drawer
        closeIcon={false}
        placement="bottom"
        width="100vw"
        height="auto"
        onClose={onClose}
        open={open}
        style={styles.drawerStyle}
      >
        <div className="drawer-body-wrap">
          <div className="drawer-title-line">
            {selected_type === FILE_TYPE_FOLDER ? FOLDERS_TITLE : FILES_TITLE}
          </div>
          <div className="drawer-body-text-line">
            <span className="header-file-info-text-line-title">
              {FILE_INFO_NAME_TITLE}
            </span>
            <span className="header-file-info-text-line-main">
              {selected_name}
            </span>
          </div>
          {selected_type !== FILE_TYPE_FOLDER && (
            <div className="drawer-body-text-line">
              <span className="header-file-info-text-line-title">
                {FILE_INFO_SIZE_TITLE}
              </span>
              <span className="header-file-info-text-line-main">
                {formatFileSize(selected_size)}
              </span>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}
