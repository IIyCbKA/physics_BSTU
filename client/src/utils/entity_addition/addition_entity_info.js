import { FileFilled, LinkOutlined } from "@ant-design/icons";
import { styles } from "./styles/style_addition_entity";
import "./styles/style_addition_entity.css";
import { ADDITION_TYPE_FILE, ADDITION_TYPE_LINK } from "../../constants";

const LINK_TITLE = "Ссылка";

export default function AdditionEntityInfo(props) {
  const styleAdditionTitle = () => {
    if (props.type === ADDITION_TYPE_LINK && props.isHover) {
      return styles.titleAdditionLinkHover;
    } else {
      return styles.titleAdditionDefault;
    }
  };

  return (
    <div className="addition-entity-info-wrap">
      <div className="addition-entity-icon-wrap">
        {props.type === ADDITION_TYPE_LINK && (
          <LinkOutlined style={styles.icon} />
        )}
        {props.type === ADDITION_TYPE_FILE && (
          <FileFilled style={styles.icon} />
        )}
      </div>
      <div className="addition-entity-root">
        <div className="addition-title-root" style={styleAdditionTitle()}>
          {props.type === ADDITION_TYPE_LINK && LINK_TITLE}
          {props.type === ADDITION_TYPE_FILE && props.name}
        </div>
        <div className="addition-text-root">
          {props.type === ADDITION_TYPE_LINK && props.name}
          {props.type === ADDITION_TYPE_FILE &&
            props.content.fileType.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
