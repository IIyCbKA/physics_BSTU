import React, {useRef} from "react";
import {addWorkFile} from "../../../actions/journal";
import './style_add_file_btn.css'
import '../styles/style_task.css'
import {WORK_STATUS_COMPLETED} from "../../../constants";

const BTN_TEXT = 'Добавить файл'

export default function AddFileBtn(props){
    const fileInputRef = useRef(null);
    const disabled = props.workInfo.status === WORK_STATUS_COMPLETED

    const handleAddFileClick = () => {
        fileInputRef.current.click();
    }

    const handleFileSelect = async (event) => {
        const selectedFile = event.target.files[0];
        try {
            await addWorkFile(selectedFile, props.id)
        } catch (error) {
            console.log(error);
        }

        event.target.value = null;
    }

    return (
        <div
            className={'work-btns-all add-work-btn' +
                (disabled ? ' work-btns-disabled' : '')}
            onClick={handleAddFileClick}
        >
            <input type="file" ref={fileInputRef}
                   style={{display: 'none'}}
                   onChange={handleFileSelect}
            />
            <div className='add-work-text'>
                {BTN_TEXT}
            </div>
        </div>
    )
}