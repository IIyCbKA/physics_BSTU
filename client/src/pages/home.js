import Header from "../components/header/header";
import {Helmet} from 'react-helmet';
import {getFilesName} from '../actions/files'
import React, {useEffect} from "react";
import {useLocation} from 'react-router-dom';
import {setPath} from "../reducers/file_reducer";
import {useDispatch, useSelector} from "react-redux";
import Storage from "../components/storage/storage";

function Home() {
    const dispatch = useDispatch()
    const pathSel = useSelector(state => state.file.path)
    const location = useLocation();
    const path = location.pathname.endsWith('/') ? location.pathname:
        location.pathname + '/';

    useEffect(() => {
        const waitFunc = async () => {
            await dispatch(setPath(decodeURIComponent(path)))
            await getFilesName(path)(dispatch)
        }
        waitFunc()
    }, [pathSel]);

    return (
        <div style={{backgroundColor: '#EBF0FF'}}>
            <Helmet>
                <title>Хранилище</title>
            </Helmet>
            <Header/>
            <Storage/>
        </div>
    );
}

export default Home;
