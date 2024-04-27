import {Form, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {styles} from "./styles/style_modal";
import './styles/style_modal.css'

export default function InputLine(props) {
    const [inputIsFocused, setInputIsFocused] = useState(false);

    const inputOnFocus = () => {
        setInputIsFocused(true);
    };

    const inputOnBlur = () => {
        setInputIsFocused(false);
    };

    const inputLineStyle = () => {
        if (inputIsFocused) {
            return styles.focusInputLineStyle
        } else {
            return styles.modalInputLineStyle
        }
    };

    return (
        <div className="inputs-margin">
            <Form.Group
                className="modal-input"
                controlId="formBasicName"
            >
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        style={inputLineStyle()}
                        onFocus={inputOnFocus}
                        onBlur={inputOnBlur}
                    />
                </InputGroup>
            </Form.Group>
        </div>
    )
}