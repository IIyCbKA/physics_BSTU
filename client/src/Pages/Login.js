import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "../Components/Header";
import {Helmet} from 'react-helmet';
import React, {useState} from 'react';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import "../styles/App.css"
import {motion} from "framer-motion";
import {styles} from "../styles/style";
import eyeClose from '../Images/eyeClose.png'
import eyeOpen from '../Images/eyeOpen.png'

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://lk.bstu.ru/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log(1)
            }
        } catch (error) {
            console.log(2)
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                            <Form.Group className="elements-form" controlId="formBasicName">
                                <Form.Control
                                    type="text"
                                    placeholder="Логин"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-elements"/>
                            </Form.Group>
                        </div>
                        <div className="inputs-margin">
                            <Form.Group className="elements-form" controlId="formBasicPassword">
                                <InputGroup>
                                    <FormControl
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-elements"
                                        style={styles.passwordInputFieldStyle}
                                    />
                                    <InputGroup.Text
                                        onClick={togglePasswordVisibility}
                                        style={styles.buttonChangeVisibilityStyle}>
                                        <img src={showPassword ? eyeClose : eyeOpen} alt="" width="20" height="20"/>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className="btn-margin">
                            <Button variant="primary"
                                    type="submit"
                                    onClick={handleFormSubmit}
                                    style={styles.formButtonStyle}
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

