import React from "react";
import "./style_submit_work_btn.css";
import "../styles/style_task.css";
import { handInWork, returnOwnWork } from "../../../actions/journal";
import { WORK_STATUS_COMPLETED } from "../../../constants";

const BTN_RETURN_TEXT = "Отозвать работу";
const BTN_SUBMIT_TEXT = "Сдать работу";

export default function SubmitWorkBtn({ id, disabled, workInfo }) {
  const handleSubmitWorkClick = async () => {
    if (workInfo.status !== WORK_STATUS_COMPLETED) {
      handInWork(id);
    } else {
      returnOwnWork(id);
    }
  };

  return (
    <div
      className={
        "work-btns-all submit-work-btn" +
        (disabled ? " work-btns-disabled" : "")
      }
      onClick={handleSubmitWorkClick}
    >
      <div className="submit-work-text">
        {workInfo.status === WORK_STATUS_COMPLETED
          ? BTN_RETURN_TEXT
          : BTN_SUBMIT_TEXT}
      </div>
    </div>
  );
}
