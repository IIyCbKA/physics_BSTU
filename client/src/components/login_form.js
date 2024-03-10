import {motion} from "framer-motion";
import {Form} from "react-bootstrap";
import React, {useState} from "react";
import LoginLine, {email} from "../elements/login/login_line";
import PasswordLine, {password} from "../elements/login/password_line";
import LoginBtn from "../elements/login/login_btn";
import {login} from "../actions/user";
import {useDispatch} from "react-redux";

export default function LoginForm(){
    const [password, setPassword] = useState(''); //export
    const [email, setEmail] = useState(''); //export
    const dispatch = useDispatch()

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
                        onClick={() => dispatch(login(email, password))}
                        setPassword={setPassword}
                    />
                </Form>
            </motion.div>
        </div>
    )

}
