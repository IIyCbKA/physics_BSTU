import { Modal } from "antd";
import "../../../elements/modal/styles/style_modal.css";
import HeaderModal from "../../../elements/modal/header_modal";
import { deleteTask } from "../../../actions/journal";
import {
  DEFAULT_MODAL_CANCEL_BTN_TEXT,
  NOTIFICATION_ERROR_DEFAULT_TITLE,
  NOTIFICATION_ERROR_STATUS,
  NOTIFICATION_SUCCESS_STATUS,
} from "../../../constants";

const TITLE_TEXT = "Удалить задание?";
const OK_BTN_TEXT = "Удалить";
const BODY_TEXT = "Оценки и комментарии также будут удалены.";
const SUCCESS_DELETE_TASK_STATUS = 200;
const SUCCESS_TITLE = "Задание успешно удалено.";

export default function DeleteTaskModal(props) {
  const handleCancel = () => {
    props.setShowModal(false);
  };

  const handleOk = async () => {
    const status = await deleteTask(props.taskID);

    if (status === SUCCESS_DELETE_TASK_STATUS) {
      props.openNotification(
        NOTIFICATION_SUCCESS_STATUS,
        SUCCESS_TITLE,
        "Задание и все его данные были успешно удалены.",
      );
    } else {
      props.openNotification(
        NOTIFICATION_ERROR_STATUS,
        NOTIFICATION_ERROR_DEFAULT_TITLE,
        `Задание '${props.taskName}' 
                не удалось удалить. Повторите попытку позже.`,
      );
    }

    handleCancel();
  };

  return (
    <Modal
      open={props.isShow}
      title={<HeaderModal text={TITLE_TEXT} handleClick={handleCancel} />}
      okText={OK_BTN_TEXT}
      cancelText={DEFAULT_MODAL_CANCEL_BTN_TEXT}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ className: "modal-cancel-btn modal-btn-font" }}
      okButtonProps={{ className: "modal-ok-btn modal-btn-font" }}
      wrapClassName="modal-wrap"
      closable={false}
      className="modal-root"
      footer={(_, { OkBtn, CancelBtn }) => (
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
