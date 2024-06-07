import InputLine from "../../../../modal/input_line";
import { Modal } from "antd";
import { useState } from "react";
import "../../../../modal/styles/style_modal.css";
import HeaderModal from "../../../../modal/header_modal";
import { setStudentGrade } from "../../../../../actions/journal";
import {
  DEFAULT_MODAL_CANCEL_BTN_TEXT,
  DEFAULT_MODAL_OK_BTN_TEXT,
} from "../../../../../constants";

const TITLE_TEXT = "Изменить оценку";
const INPUT_PLACEHOLDER_TEXT = "Новая оценка";

export default function ChangeGradeModal(props) {
  const [grade, setGrade] = useState(
    props.work.grade.grade ? props.work.grade.grade : "",
  );
  const gradesIsEqual = props.work.grade.grade === grade;

  const handleCancel = () => {
    props.setShow(false);
    props.cleanSelectInfo();
  };

  const handleOk = async () => {
    await setStudentGrade(props.work.id, props.studentID, grade);
    handleCancel();
  };

  return (
    <Modal
      open={props.show}
      title={<HeaderModal text={TITLE_TEXT} />}
      okText={DEFAULT_MODAL_OK_BTN_TEXT}
      cancelText={DEFAULT_MODAL_CANCEL_BTN_TEXT}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ className: "modal-cancel-btn modal-btn-font" }}
      okButtonProps={{
        className: "modal-ok-btn modal-btn-font",
        disabled: gradesIsEqual,
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
      <InputLine
        value={grade}
        onChange={setGrade}
        placeholder={INPUT_PLACEHOLDER_TEXT}
        handleOk={handleOk}
      />
    </Modal>
  );
}
