import {Helmet} from 'react-helmet';
import React from 'react';
import LoginForm from "../components/login_form";

function Login() {
    return (
        <div>
            <Helmet>
                <title>Авторизация</title>
            </Helmet>
            <LoginForm/>
        </div>
    );
}

export default Login;
