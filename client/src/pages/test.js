import React from 'react';
import DefaultHeader from "../components/header/default_header/default_header";
import {Helmet} from 'react-helmet';

function Test() {
    return (
        <div>
            <Helmet>
                <title>Каталог тестов</title>
            </Helmet>
            <DefaultHeader/>
        </div>
    );
}

export default Test;