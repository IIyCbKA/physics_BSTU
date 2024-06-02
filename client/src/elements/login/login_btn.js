import {Button} from "react-bootstrap";
import {styles} from "./styles/style_login";
import React, {useState} from "react";
import './styles/style_login.css'


export default function LoginBtn(props){
    const [btnIsFocused, setBtnIsFocused] = useState(false);

    const changeBtnActive = () => {
        setBtnIsFocused(!btnIsFocused);
    };

    const btnColor = () => {
        if (btnIsFocused){
            return '#64A5D9'
        } else {
            return '#6CB2EB'
        }
    };

    return (
        <div className="login-btn-wrap">
            <Button variant="primary"
                    type="submit"
                    style={{
                        ...styles.formButtonStyle,
                        backgroundColor: btnColor(),
                        animation: props.isButtonShaking ?
                            "shakeButton 0.5s" : "none"
                    }}
                    onClick={props.onClick}
                    onMouseEnter={changeBtnActive}
                    onMouseLeave={changeBtnActive}
                    disabled={props.disabled}
            >
                <h2 className="login-btn-text">{props.text}</h2>
            </Button>
        </div>
    )
}
