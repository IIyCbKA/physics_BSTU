import { Modal } from "antd";
import "../../../../modal/styles/style_modal.css";
import HeaderModal from "../../../../modal/header_modal";
import { returnStudentWork } from "../../../../../actions/journal";
import { DEFAULT_MODAL_CANCEL_BTN_TEXT } from "../../../../../constants";

const OK_BTN_TEXT = "Вернуть";
const TITLE_TEXT = "Вернуть работу?";
const BODY_TEXT = "Вы хотите вернуть студенту его работу?";

export default function ReturnWorkModal(props) {
  const handleCancel = () => {
    props.setShow(false);
    props.cleanSelectInfo();
  };

  const handleOk = async () => {
    await returnStudentWork(props.work.id, props.studentID);
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
        className: "modal-ok-btn modal-btn-font modal-return-btn",
      }}
      wrapClassName="modal-wrap"
      closable={false}
      className="modal-root"
      zIndex="1500"
      footer={(_, { CancelBtn, OkBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
      centered={true}
    >
      <div className="modal-body-text">{BODY_TEXT}</div>
    </Modal>
  );
}
