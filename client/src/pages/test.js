import React from 'react';
import Header from "../components/header/header";
import {Helmet} from 'react-helmet';

function Test(props) {
    return (
        <div>
            <Helmet>
                <title>Каталог тестов</title>
            </Helmet>
            <Header orientation={props.orientation}/>
        </div>
    );
}

export default Test;