import DefaultHeader from "../components/header/default_header/default_header";
import FileHeader from "../components/header/file_header/file_header";
import {Helmet} from 'react-helmet';
import {getFilesName} from '../actions/files'
import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import {setPath} from "../reducers/file_reducer";
import {useDispatch, useSelector} from "react-redux";
import Storage from "../components/storage/storage";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import './styles/style_from_pages.css'
import {socket} from "../classes/socket_client";

function Home() {
    const dispatch = useDispatch()
    const selected_id = useSelector(state => state.file.selected_id)
    const location = useLocation();
    const path = location.pathname.endsWith('/') ? location.pathname:
        location.pathname + '/';
    const [initSuccess, setInitSuccess] = useState(false);
    const [showFileHeader, setShowFileHeader] = useState(false);

    useEffect(() => {
        setShowFileHeader(selected_id !== null);
    }, [selected_id]);

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
            socket.init('files', {path: decode_path.slice(5)})
        }
        waitFunc()
    });

    const styleHeaderBlock = () => {
        return {height: '60px',
                position: selected_id !== null ? 'sticky' : 'relative',
                top: 0,
                zIndex: 100
        }
    }
    
    return (
        <div style={{backgroundColor: '#EBF0FF'}}>
            <Helmet>
                <title>Хранилище</title>
            </Helmet>
            <div style={styleHeaderBlock()}>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={showFileHeader ? 'fileHeader' : 'defaultHeader'}
                        in={showFileHeader}
                        timeout={200}
                        classNames="header-transition"
                    >
                        {showFileHeader ? <FileHeader /> : <DefaultHeader />}
                    </CSSTransition>
                </SwitchTransition>
            </div>
            {initSuccess && <Storage/>}
        </div>
    );
}

export default Home;
