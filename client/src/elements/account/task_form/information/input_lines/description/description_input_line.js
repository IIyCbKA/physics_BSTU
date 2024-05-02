import './styles/description_task_input.css'
import {Input} from "antd";

export default function DescriptionInputLine(props){
    const {TextArea} = Input;

    const handleChange = (e) => {
        props.setDescription(e.target.value)
    }

    return (
        <div className='description-input-line-wrap'>
            <div className='description-input-line-root'>
                <div className='description-input-line-main'>
                    <TextArea placeholder="Инструкции" autoSize
                         style={{
                             minHeight: '140px'
                         }}
                         onChange={handleChange}
                         value={props.description}
                    />
                </div>
            </div>
        </div>
    )
}
