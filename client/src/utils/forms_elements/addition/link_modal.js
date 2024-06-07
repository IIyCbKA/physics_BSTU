import InputLine from "../../../elements/modal/input_line";
import HeaderModal from "../../../elements/modal/header_modal";
import { Modal } from "antd";
import { useState } from "react";
import "../../../elements/modal/styles/style_modal.css";
import {
  ADDITION_TYPE_LINK,
  DEFAULT_MODAL_CANCEL_BTN_TEXT,
} from "../../../constants";

const TITLE_TEXT = "Добавьте ссылку";
const OK_BTN_TEXT = "Добавить ссылку";
const INPUT_PLACEHOLDER_TEXT = "Ссылка";

export default function ModalLink(props) {
  const [link, setLink] = useState("");

  const handleCancel = () => {
    props.handleClose();
  };

  const handleOk = async () => {
    const currentId = props.nextId();
    props.setAdditions([
      ...props.additions,
      {
        id: currentId,
        name: link,
        type: ADDITION_TYPE_LINK,
        remote: false,
        content: null,
      },
    ]);
    handleCancel();
  };

  return (
    <Modal
      open={props.show}
      title={<HeaderModal text={TITLE_TEXT} />}
      okText={OK_BTN_TEXT}
      cancelText={DEFAULT_MODAL_CANCEL_BTN_TEXT}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ className: "modal-cancel-btn modal-btn-font" }}
      okButtonProps={{
        className: "modal-ok-btn modal-btn-font",
        disabled: link.length === 0,
      }}
      wrapClassName="modal-wrap"
      className="modal-root"
      closable={false}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
      centered={true}
    >
      <InputLine
        value={link}
        onChange={setLink}
        placeholder={INPUT_PLACEHOLDER_TEXT}
        handleOk={handleOk}
      />
    </Modal>
  );
}
