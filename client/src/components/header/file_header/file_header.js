import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { styles } from "./styles/style_file_header";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  FileDownloadOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import { cleanSelectedInfo } from "../../../reducers/file_reducer";
import { deleteFile, downloadFile } from "../../../actions/files";
import "./styles/style_file_header.css";
import {
  EMPLOYEE_USER_STATUS,
  FILE_TYPE_FOLDER,
  NOTIFICATION_ERROR_DEFAULT_TITLE,
  NOTIFICATION_ERROR_STATUS,
  NOTIFICATION_SUCCESS_STATUS,
  PORTRAIT_ORIENTATION,
} from "../../../constants";
import DropdownFileInfo from "./dropdown_file_info";
import { isMobile } from "react-device-detect";
import DrawerFileInfo from "./drawer_file_info";

const SUCCESS_DELETE_STATUS = 200;
const SUCCESS_TITLE = "Файл успешно удален";

export default function FileHeader(props) {
  const userStatus = useSelector((state) => state.user.currentUser.status);
  const orientation = useSelector((state) => state.app.orientation);
  const selected_id = useSelector((state) => state.file.selected_id);
  const selected_name = useSelector((state) => state.file.selected_name);
  const selected_type = useSelector((state) => state.file.selected_type);
  const type_last_closed = useSelector((state) => state.file.type_last_closed);
  const dispatch = useDispatch();

  const containerStyle = () => {
    return orientation === PORTRAIT_ORIENTATION
      ? styles.containerHeaderMobile
      : styles.containerHeaderPC;
  };

  const handleClickClose = () => {
    dispatch(cleanSelectedInfo());
  };

  const onDownload = async () => {
    await downloadFile(selected_name, selected_id);
  };

  const onDelete = async () => {
    const status = await deleteFile(selected_id);

    if (status === SUCCESS_DELETE_STATUS) {
      props.openNotification(
        NOTIFICATION_SUCCESS_STATUS,
        SUCCESS_TITLE,
        `Файл '${selected_name}' успешно удален из хранилища.`,
      );
    } else {
      props.openNotification(
        NOTIFICATION_ERROR_STATUS,
        NOTIFICATION_ERROR_DEFAULT_TITLE,
        "Произошла ошибка при " +
          "попытке удалить файл. Повторите попытку позже",
      );
    }
    dispatch(cleanSelectedInfo());
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={styles.navbarFileHeader}>
      <Container fluid style={containerStyle()}>
        <Nav style={styles.navStyle}>
          <div className="bar-left">
            {isMobile ? <DrawerFileInfo /> : <DropdownFileInfo />}
          </div>
          <div className="bar-right">
            <div className="bar-right-text-zone">
              <div className="bar-text-wrap">
                <span className="bar-text">{selected_name}</span>
              </div>
            </div>
            <div className="bar-right-icons-zone">
              {userStatus === EMPLOYEE_USER_STATUS && (
                <Nav.Item style={styles.navItemStyle} onClick={onDelete}>
                  <DeleteOutlined style={styles.iconsStyle} />
                </Nav.Item>
              )}
              {((selected_type !== FILE_TYPE_FOLDER && selected_type) ||
                (!selected_type && type_last_closed !== FILE_TYPE_FOLDER)) && (
                <Nav.Item style={styles.navItemStyle} onClick={onDownload}>
                  <FileDownloadOutlined style={styles.iconsStyle} />
                </Nav.Item>
              )}
              <Nav.Item style={styles.navItemStyle} onClick={handleClickClose}>
                <CloseOutlined style={styles.iconsStyle} />
              </Nav.Item>
            </div>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}
