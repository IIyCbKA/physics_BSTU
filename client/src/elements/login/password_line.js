import { Form, FormControl, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import { styles } from "./styles/style_login";
import "./styles/style_login.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const INPUT_PLACEHOLDER_TEXT = "Пароль";

export default function PasswordLine(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const passwordLineStyle = () => {
    if (passwordIsFocused) {
      return styles.focusPasswordLineStyle;
    } else {
      return styles.inputLinesStyle;
    }
  };

  const passwordOnFocus = () => {
    setPasswordIsFocused(true);
  };

  const passwordOnBlur = () => {
    setPasswordIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const btnHidePasswordChangeStyle = () => {
    if (passwordIsFocused) {
      return styles.focusButtonChangeVisibilityStyle;
    } else {
      return styles.inputLinesStyle;
    }
  };

  return (
    <div className="login-input-line-wrap">
      <Form.Group className="elements-form" controlId="formBasicPassword">
        <InputGroup>
          <FormControl
            type={showPassword ? "text" : "password"}
            placeholder={INPUT_PLACEHOLDER_TEXT}
            value={props.value}
            onChange={props.onChange}
            style={passwordLineStyle()}
            onFocus={passwordOnFocus}
            onBlur={passwordOnBlur}
          />
          <InputGroup.Text
            onClick={togglePasswordVisibility}
            style={btnHidePasswordChangeStyle()}
            className="btn-hide-password-style"
          >
            {showPassword ? (
              <EyeInvisibleOutlined style={styles.iconEye} />
            ) : (
              <EyeOutlined style={styles.iconEye} />
            )}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
    </div>
  );
}
