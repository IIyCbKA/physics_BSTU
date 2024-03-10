import {motion} from "framer-motion";
import {Form} from "react-bootstrap";
import React from "react";
import LoginLine from "../elements/login/login_line";
import PasswordLine from "../elements/login/password_line";
import LoginBtn from "../elements/login/login_btn";

export default function LoginForm(){
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
                    <LoginLine/>
                    <PasswordLine/>
                    <LoginBtn/>
                </Form>
            </motion.div>
        </div>
    )

}