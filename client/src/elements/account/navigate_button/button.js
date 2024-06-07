import { Button } from "react-bootstrap";
import { styles } from "./styles/style_navigate_btn";
import React, { useState } from "react";

export default function AccountNavigateBtn(props) {
  const [btnIsFocused, setBtnIsFocused] = useState(false);

  const btnStyle = () => {
    if (btnIsFocused && props.selected) {
      return styles.btnSelectedAndFocus;
    } else if (btnIsFocused && !props.selected) {
      return styles.btnFocusStyle;
    } else if (!btnIsFocused && props.selected) {
      return styles.btnSelectedAndNonFocus;
    } else {
      return styles.btnDefaultStyle;
    }
  };

  const handleClick = () => {
    if (props.otherSelected) {
      props.changeOtherSelected(false);
    }

    props.changeSelected(true);
  };

  return (
    <Button
      variant="primary"
      type="submit"
      style={btnStyle()}
      onMouseEnter={() => setBtnIsFocused(true)}
      onMouseLeave={() => setBtnIsFocused(false)}
      onClick={handleClick}
    >
      {props.text}
    </Button>
  );
}
