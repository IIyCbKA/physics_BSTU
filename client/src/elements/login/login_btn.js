import {Button} from "react-bootstrap";
import {login} from "../../actions/user";
import {styles} from "../../styles/style";
import React, {useState} from "react";
import {useDispatch} from "react-redux";


export default function LoginBtn(props){
    //const isButtonDisabled = email === '' || password === '';
    const [btnIsFocused, setBtnIsFocused] = useState(false);
    const [isButtonShaking, setButtonShaking] = useState(false);

    function incorrectData(){
        setButtonShaking(true);

        setTimeout(() => {
            setButtonShaking(false);
            props.setPassword('');
        }, 500);
    }

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
                    type="submit"
                    style={{
                        ...styles.formButtonStyle,
                        backgroundColor: btnColor(),
                        animation: isButtonShaking ? "shakeButton 0.5s" : "none"
                    }}
                    onClick={props.onClick}
                    onMouseEnter={changeBtnActive}
                    onMouseLeave={changeBtnActive}
                    //disabled={isButtonDisabled}
                    className="form-btn">
                <h2 className="no-margin">Продолжить</h2>
            </Button>
        </div>
    )
}
