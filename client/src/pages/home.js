import DefaultHeader from "../components/header/default_header/default_header";
import FileHeader from "../components/header/file_header/file_header";
import {Helmet} from 'react-helmet';
import {getFilesName} from '../actions/files'
import React, {useEffect, useState} from "react";
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
    const [initSuccess, setInitSuccess] = useState(false);

    useEffect(() => {
        const waitFunc = async () => {
            const decode_path = decodeURIComponent(path)
            await dispatch(setPath(decode_path))
            const code = await getFilesName(path)(dispatch)

            if (code === 404) {
                const diskPos = decode_path.search('/disk/')
                window.location.href = decode_path.slice(
                    0, diskPos + '/disk/'.length)
            } else{
                setInitSuccess(true)
            }
        }
        waitFunc()
    }, [pathSel]);

    return (
        <div style={{backgroundColor: '#EBF0FF'}}>
            <Helmet>
                <title>Хранилище</title>
            </Helmet>
            <FileHeader/>
            <DefaultHeader/>
            {initSuccess && <Storage/>}
        </div>
    );
}

export default Home;
