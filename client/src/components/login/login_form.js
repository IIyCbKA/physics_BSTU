import {motion} from "framer-motion";
import {Form} from "react-bootstrap";
import React, {useState} from "react";
import LoginLine from "../../elements/login/login_line";
import PasswordLine from "../../elements/login/password_line";
import LoginBtn from "../../elements/login/login_btn";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";
import './styles/style_login_form.css'
import {Helmet} from "react-helmet";

export default function LoginForm(){
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isButtonShaking, setButtonShaking] = useState(false);
    const [btnText, setBtnText] = useState('Продолжить')
    const isButtonDisabled = email === '' || password === '' || btnText !== 'Продолжить';
    const windowHeight = window.innerHeight
    const dispatch = useDispatch()

    const onClick = async (e) => {
    	e.preventDefault()
        setBtnText('Подождите...')
    	const result = await dispatch(login(email, password))
        if (!result){
            setButtonShaking(true);

            setTimeout(() => {
                setButtonShaking(false);
                setPassword('');
                setBtnText('Продолжить')
            }, 500);
        }
    }

    return (
        <div className='login-form-wrap' style={{minHeight: windowHeight}}>
            <div className="form-container">
                <Helmet>
                    <title>Авторизация</title>
                </Helmet>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        delay: 0.25,
                        duration: 1
                    }}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: '540px',
                        minWidth: '340px',
                        padding: '20px'
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
                            disabled={isButtonDisabled}
                            onClick={onClick}
                            setPassword={setPassword}
                            isButtonShaking={isButtonShaking}
                            text={btnText}
                        />
                    </Form>
                </motion.div>
            </div>
        </div>
    )

}
