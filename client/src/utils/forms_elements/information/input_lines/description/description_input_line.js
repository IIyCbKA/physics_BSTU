import "./styles/description_task_input.css";
import { Input } from "antd";

const INPUT_PLACEHOLDER_TEXT = "Инструкции";

export default function DescriptionInputLine(props) {
  const { TextArea } = Input;

  const handleChange = (e) => {
    props.setDescription(e.target.value);
  };

  return (
    <div className="description-input-line-wrap">
      <div className="description-input-line-root">
        <div className="description-input-line-main">
          <TextArea
            placeholder={INPUT_PLACEHOLDER_TEXT}
            autoSize
            style={{
              minHeight: "140px",
            }}
            onChange={handleChange}
            value={props.description}
          />
        </div>
      </div>
    </div>
  );
}
