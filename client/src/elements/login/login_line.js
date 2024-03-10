import {Form, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {styles} from "../../styles/style";

export const [email, setEmail] = useState('');

export default function LoginLine() {
    const [loginIsFocused, setLoginIsFocused] = useState(false);

    const loginOnFocus = () => {
        setLoginIsFocused(true);
    };

    const loginOnBlur = () => {
        setLoginIsFocused(false);
    };

    const loginLineStyle = () => {
        if (loginIsFocused) {
            return styles.focusLoginLineStyle
        } else {
            return styles.inputLinesStyle
        }
    };

    return (
        <div className="inputs-margin">
            <Form.Group
                className="elements-form"
                controlId="formBasicName"
            >
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)}
                        style={loginLineStyle()}
                        onFocus={loginOnFocus}
                        onBlur={loginOnBlur}
                    />
                </InputGroup>
            </Form.Group>
        </div>
    )
}