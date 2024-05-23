import React from "react";
import './style_submit_work_btn.css'
import '../styles/style_task.css'
import {handInWork, returnOwnWork} from "../../../actions/journal";

export default function SubmitWorkBtn({id, disabled, workInfo}){
    const returnText = 'Отозвать работу'
    const submitText = 'Сдать работу'

    const handleSubmitWorkClick = async () => {
        if (workInfo.status !== 'Сдано'){
            handInWork(id)
        } else {
            returnOwnWork(id)
        }
    }

    return (
        <div className={`work-btns-all submit-work-btn 
        ${disabled ? 'disabled-submit-work-btn' : ''}`}>
            <div className='submit-work-text' onClick={handleSubmitWorkClick}>
                {workInfo.status === 'Сдано' ? returnText : submitText}
            </div>
        </div>
    )
}