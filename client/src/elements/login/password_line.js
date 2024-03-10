import {Form, FormControl, InputGroup} from "react-bootstrap";
import eyeClose from "../../images/eyeClose.png";
import eyeOpen from "../../images/eyeOpen.png";
import React, {useState} from "react";
import {styles} from "../../styles/style";

export const [password, setPassword] = useState('');

export default function PasswordLine(){
    const [showPassword, setShowPassword] = useState(false);
    const [passwordIsFocused, setPasswordIsFocused] = useState(false);

    const passwordLineStyle = () => {
        if (passwordIsFocused) {
            return styles.focusPasswordLineStyle
        } else {
            return styles.inputLinesStyle
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
            return styles.focusButtonChangeVisibilityStyle
        } else {
            return styles.inputLinesStyle
        }
    };

    return (
        <div className="inputs-margin">
            <Form.Group
                className="elements-form"
                controlId="formBasicPassword"
            >
                <InputGroup>
                    <FormControl
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}
                        style={passwordLineStyle()}
                        onFocus={passwordOnFocus}
                        onBlur={passwordOnBlur}
                    />
                    <InputGroup.Text
                        onClick={togglePasswordVisibility}
                        style={btnHidePasswordChangeStyle()}
                        className="btn-hide-password-style"
                    >
                        <img src={showPassword ? eyeClose : eyeOpen}
                             alt=""
                             width="20"
                             height="20"
                        />
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </div>
    )
}