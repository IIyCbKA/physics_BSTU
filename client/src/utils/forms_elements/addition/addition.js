import "./styles/style_addition.css";
import { styles } from "./styles/style_addition";
import { Button } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import ModalLink from "./link_modal";
import { getFilenameOnly, getFileType } from "../../../actions/strings";
import { FileUploadOutlined, Link } from "@mui/icons-material";
import { ADDITION_TYPE_FILE } from "../../../constants";

const ADDITION_TITLE_TEXT = "Прикрепить";
const ADD_FILE_BTN_BOTTOM_TEXT = "Загрузить";
const ADD_LINK_BTN_BOTTOM_TEXT = "Ссылка";

export default function Addition(props) {
  const [isModalOpen, setModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {}, [props.additions]);

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files[0];
    try {
      const currentId = props.nextId();
      props.setAdditions([
        ...props.additions,
        {
          id: currentId,
          name: getFilenameOnly(selectedFile.name),
          type: ADDITION_TYPE_FILE,
          remote: false,
          content: {
            fileType: getFileType(selectedFile.name),
            file: selectedFile,
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }

    event.target.value = null;
  };

  const handleAddFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="addition-wrap">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      <div className="addition-form">
        <span className="addition-title">{ADDITION_TITLE_TEXT}</span>
        <div className="addition-buttons-wrap">
          <div className="addition-btn-area">
            <div className="addition-btn-icon-wrap">
              <Button
                className="addition-btn-style"
                onClick={handleAddFileClick}
              >
                <FileUploadOutlined style={styles.styleIcons} />
              </Button>
            </div>
            <div className="addition-btn-text-wrap">
              {ADD_FILE_BTN_BOTTOM_TEXT}
            </div>
          </div>
          <div className="addition-btn-area">
            <div className="addition-btn-icon-wrap">
              <Button className="addition-btn-style" onClick={handleOpenModal}>
                <Link style={styles.styleIcons} />
              </Button>
            </div>
            <div className="addition-btn-text-wrap">
              {ADD_LINK_BTN_BOTTOM_TEXT}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalLink
          show={isModalOpen}
          handleClose={handleCloseModal}
          additions={props.additions}
          setAdditions={props.setAdditions}
          nextId={props.nextId}
        />
      )}
    </div>
  );
}
