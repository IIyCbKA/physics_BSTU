import {Form, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {styles} from "./styles/style";
import './styles/style.css'

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
                className="elements-form"
                controlId="formBasicName"
            >
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder='Новая папка'
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