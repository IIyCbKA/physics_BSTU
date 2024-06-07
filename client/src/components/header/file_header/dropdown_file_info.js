import { useSelector } from "react-redux";
import { styles } from "./styles/style_file_header";
import { InfoOutlined } from "@mui/icons-material";
import { Nav } from "react-bootstrap";
import { Dropdown } from "antd";
import "./styles/style_file_header.css";
import {
  FILE_INFO_NAME_TITLE,
  FILE_INFO_SIZE_TITLE,
  FILE_TYPE_FOLDER,
} from "../../../constants";
import { formatFileSize } from "../../../actions/files";

export default function DropdownFileInfo() {
  const selected_name = useSelector((state) => state.file.selected_name);
  const selected_type = useSelector((state) => state.file.selected_type);
  const selected_size = useSelector((state) => state.file.selected_size);

  const customDropdown = () => (
    <div className="dropdown-wrap">
      <div className="dropdown-text-line">
        <span className="header-file-info-text-line-title">
          {FILE_INFO_NAME_TITLE}
        </span>
        <span className="header-file-info-text-line-main">{selected_name}</span>
      </div>
      {selected_type !== FILE_TYPE_FOLDER && (
        <div className="dropdown-text-line">
          <span className="header-file-info-text-line-title">
            {FILE_INFO_SIZE_TITLE}
          </span>
          <span className="header-file-info-text-line-main">
            {formatFileSize(selected_size)}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <Dropdown dropdownRender={customDropdown} trigger={["click"]}>
      <Nav.Item style={styles.navItemStyle}>
        <InfoOutlined style={styles.iconsStyle} />
      </Nav.Item>
    </Dropdown>
  );
}
