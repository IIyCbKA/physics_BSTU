import './styles/description_task_input.css'
import {Input} from "antd";

export default function DescriptionInputLine(){
    const {TextArea} = Input;

    return (
        <div className='description-input-line-wrap'>
            <div className='description-input-line-root'>
                <div className='description-input-line-main'>
                    <TextArea placeholder="Инструкции" autoSize
                         style={{
                             minHeight: '140px'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}