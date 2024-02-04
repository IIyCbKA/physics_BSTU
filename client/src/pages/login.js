import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../components/header";
import {Helmet} from 'react-helmet';
import React, {useState} from 'react';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import "../styles/style.css"
import {motion} from "framer-motion";
import {styles} from "../styles/style";
import eyeClose from '../images/eyeClose.png'
import eyeOpen from '../images/eyeOpen.png'
import {socket} from '../socket_client'

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordIsFocused, setPasswordIsFocused] = useState(false);
    const [loginIsFocused, setLoginIsFocused] = useState(false);
    const [btnIsFocused, setBtnIsFocused] = useState(false);
    const [isButtonShaking, setButtonShaking] = useState(false);
    const isButtonDisabled = email === '' || password === '';

    const passwordOnFocus = () => {
        setPasswordIsFocused(true);
    };

    const passwordOnBlur = () => {
        setPasswordIsFocused(false);
    };

    const loginOnFocus = () => {
        setLoginIsFocused(true);
    };

    const loginOnBlur = () => {
        setLoginIsFocused(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const passwordLineStyle = () => {
        if (passwordIsFocused) {
            return styles.focusPasswordLineStyle
        } else {
            return styles.inputLinesStyle
        }
    };

    const btnHidePasswordChangeStyle = () => {
        if (passwordIsFocused) {
            return styles.focusButtonChangeVisibilityStyle
        } else {
            return styles.inputLinesStyle
        }
    };

    const loginLineStyle = () => {
        if (loginIsFocused) {
            return styles.focusLoginLineStyle
        } else {
            return styles.inputLinesStyle
        }
    };

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

    socket.on('incorrect_data', () => {
        setButtonShaking(true);

        setTimeout(() => {
            setButtonShaking(false);
            setPassword('');
        }, 500);
    });

    const loginClick = (e) => {
        e.preventDefault();
        socket.emit('login', {
            'email': email,
            'password': password})
    };

    return (
        <div>
            <Helmet>
                <title>Авторизация</title>
            </Helmet>
            <Header/>
            <div className="form-container">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        delay: 0.25,
                        duration: 1
                    }}
                >
                    <Form className="form">
                        <h2 className="form-title">Авторизация</h2>
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
                        <div className="btn-margin">
                            <Button variant="primary"
                                    onClick={loginClick}
                                    type="submit"
                                    style={{...styles.formButtonStyle,
                                        backgroundColor: btnColor(),
                                        animation: isButtonShaking ? "shakeButton 0.5s" : "none" }}
                                    onMouseEnter={changeBtnActive}
                                    onMouseLeave={changeBtnActive}
                                    disabled={isButtonDisabled}
                                    className="form-btn">
                                <h2 className="no-margin">Продолжить</h2>
                            </Button>
                        </div>
                    </Form>
                </motion.div>
            </div>
        </div>
    );
}

export default Login;
