import "../common_styles/common_styles_account_components.css";
import FormsHeader from "../../../utils/forms_elements/header/forms_header";
import MainJournal from "../../../elements/account/employees/main_table/root_table";
import { useEffect, useRef } from "react";

export default function JournalGroup(props) {
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (props.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.show]);

  const tableStyle = () => {
    return {
      opacity: props.show ? 1 : 0,
      visibility: props.show ? "visible" : "hidden",
      height: "100%",
    };
  };

  return (
    <div className="forms-wrap" style={tableStyle()}>
      <FormsHeader
        setShow={props.setShow}
        isJournal={true}
        tableContainerRef={tableContainerRef}
      />
      <MainJournal tableContainerRef={tableContainerRef} />
    </div>
  );
}
