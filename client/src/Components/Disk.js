import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../Actions/File";
import FileList from "./fileList/File/FileList";
import "../styles/App.css"

const Disk = () => {
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentDir !== undefined) {
            dispatch(getFiles(currentDir));
        }
    }, [currentDir, dispatch]);

    return (
        <div className="disk">
            <div className="disk_btns">
                <button className="disk_back">Назад</button>
                <button className="disk_creat">Создать папку</button>
            </div>
            <FileList/>
        </div>
    );
};


export default Disk;