import React from 'react';
import Header from "../components/header/header";
import {Helmet} from 'react-helmet';

function Test() {
    return (
        <div>
            <Helmet>
                <title>Каталог тестов</title>
            </Helmet>
            <Header/>
        </div>
    );
}

export default Test;