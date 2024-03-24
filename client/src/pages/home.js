import Header from "../components/header";
import {Helmet} from 'react-helmet';
import {getFilesName} from '../actions/files'
import React, {useEffect} from "react";
import {useLocation} from 'react-router-dom';
import {setPath} from "../reducers/file_reducer";
import {useDispatch} from "react-redux";
import Storage from "../components/storage";

function Home() {
    const dispatch = useDispatch()
    const location = useLocation();
    const path = location.pathname.endsWith('/') ? location.pathname:
        location.pathname + '/';

    useEffect(() => {
        getFilesName(path)(dispatch)
        dispatch(setPath(path))
    }, [path]);

    return (
        <div>
            <Helmet>
                <title>Хранилище</title>
            </Helmet>
            <Header/>
            <Storage/>
        </div>
    );
}

export default Home;
