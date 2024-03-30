import {motion} from "framer-motion";
import {Form} from "react-bootstrap";
import React, {useState} from "react";
import LoginLine from "../../elements/login/login_line";
import PasswordLine from "../../elements/login/password_line";
import LoginBtn from "../../elements/login/login_btn";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";
import './styles/style_login_form.css'

export default function LoginForm(){
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const isButtonDisabled = email === '' || password === '';
    const dispatch = useDispatch()
    
    const onClick = (e) => {
    	e.preventDefault()
    	dispatch(login(email, password))
    }

    return (
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
                    <LoginLine
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordLine
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <LoginBtn
                        value={isButtonDisabled}
                        onClick={onClick}
                        setPassword={setPassword}
                    />
                </Form>
            </motion.div>
        </div>
    )

}
