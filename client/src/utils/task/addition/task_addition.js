import "./styles/style_task_addition.css";
import { useState } from "react";
import AdditionEntityInfo from "../../entity_addition/addition_entity_info";
import { downloadTaskFile } from "../../../actions/journal";
import { ADDITION_TYPE_FILE, ADDITION_TYPE_LINK } from "../../../constants";

export default function TaskAddition(props) {
  const [isHover, setHover] = useState(false);

  const clickHandle = async () => {
    if (props.type === ADDITION_TYPE_LINK) {
      window.open(props.name, "_blank");
    } else if (props.type === ADDITION_TYPE_FILE) {
      await downloadTaskFile(props.name, props.id);
    }
  };

  return (
    <div
      className="task-addition-wrap"
      onClick={clickHandle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AdditionEntityInfo {...props} isHover={isHover} />
    </div>
  );
}
