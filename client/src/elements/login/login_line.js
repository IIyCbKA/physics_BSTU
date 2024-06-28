import { Form, FormControl, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import { styles } from "./styles/style_login";
import "./styles/style_login.css";

const INPUT_PLACEHOLDER_TEXT = "Email";

export default function LoginLine(props) {
  const [loginIsFocused, setLoginIsFocused] = useState(false);

  const loginOnFocus = () => {
    setLoginIsFocused(true);
  };

  const loginOnBlur = () => {
    setLoginIsFocused(false);
  };

  const loginLineStyle = () => {
    if (loginIsFocused) {
      return styles.focusLoginLineStyle;
    } else {
      return styles.inputLinesStyle;
    }
  };

  return (
    <div className="login-input-line-wrap">
      <Form.Group className="elements-form" controlId="formBasicName">
        <InputGroup>
          <FormControl
            className='input-placeholder'
            type="text"
            placeholder={INPUT_PLACEHOLDER_TEXT}
            value={props.value}
            onChange={props.onChange}
            style={loginLineStyle()}
            onFocus={loginOnFocus}
            onBlur={loginOnBlur}
          />
        </InputGroup>
      </Form.Group>
    </div>
  );
}
