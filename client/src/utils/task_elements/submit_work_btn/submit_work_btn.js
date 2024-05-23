import React from "react";
import './style_submit_work_btn.css'
import '../styles/style_task.css'
import { handInWork } from "../../../actions/journal";

export default function SubmitWorkBtn({id}){
    const handleSubmitWorkClick = async () => {
        handInWork(id)
        }

    return (
        <div className='work-btns-all submit-work-btn'>
            <div className='submit-work-text' onClick={handleSubmitWorkClick}>
                Сдать работу
            </div>
        </div>
    )
}