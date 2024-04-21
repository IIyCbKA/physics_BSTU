import './styles/title_task_input.css'
import {Input} from "antd";

export default function TitleInputLine(){
    const {TextArea} = Input;

    return (
        <div className='title-input-line-wrap'>
            <div className='title-input-line-root'>
                <div className='title-input-line-main'>
                    <TextArea placeholder="Название" autoSize
                         style={{
                             marginBottom: '16px',
                             minHeight: '56px'
                         }}
                    />
                </div>
            </div>
        </div>
    )
}