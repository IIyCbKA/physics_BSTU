import {Button} from "react-bootstrap";
import {login} from "../../actions/user";
import {styles} from "../../styles/style";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {email} from "./login_line";
import {password, setPassword} from "./password_line";

const dispatch = useDispatch()
const isButtonDisabled = email === '' || password === '';
const [btnIsFocused, setBtnIsFocused] = useState(false);
const [isButtonShaking, setButtonShaking] = useState(false);

function incorrectData(){
    setButtonShaking(true);

    setTimeout(() => {
        setButtonShaking(false);
        setPassword('');
    }, 500);
}

export default function LoginBtn(){
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
        <div className="btn-margin">
            <Button variant="primary"
                    onClick={() => dispatch(login(email, password))}
                    type="submit"
                    style={{
                        ...styles.formButtonStyle,
                        backgroundColor: btnColor(),
                        animation: isButtonShaking ? "shakeButton 0.5s" : "none"
                    }}
                    onMouseEnter={changeBtnActive}
                    onMouseLeave={changeBtnActive}
                    disabled={isButtonDisabled}
                    className="form-btn">
                <h2 className="no-margin">Продолжить</h2>
            </Button>
        </div>
    )
}