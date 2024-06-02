import {Form, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {styles} from "./styles/style_modal";
import './styles/style_modal.css'

const ENTER_EVENT_KEY = 'Enter'

export default function InputLine(props) {
    const [inputIsFocused, setInputIsFocused] = useState(false);

    const inputOnFocus = (event) => {
        event.stopPropagation()
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
                        onKeyDown={e => {
                            if (e.key === ENTER_EVENT_KEY) {
                                props.handleOk();
                            }}
                        }
                    />
                </InputGroup>
            </Form.Group>
        </div>
    )
}