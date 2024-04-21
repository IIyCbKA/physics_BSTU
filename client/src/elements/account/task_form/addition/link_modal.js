import InputLine from "../../../modal/input_line";
import HeaderModal from "../../../modal/header_modal";
import {Modal} from "antd";
import {useState} from "react";
import '../../../modal/styles/style_modal.css'

export default function ModalLink(props){
    const [link, setLink] = useState('')

    const handleCancel = () => {
        props.handleClose()
    }

    const handleOk = async () => {
        // тут на сервак и дальше тут обрабатываем
        handleCancel()
    }

    return (
        <Modal
            open={props.show}
            title={<HeaderModal text='Добавте ссылку'
                                handleClick={handleCancel}/>}
            okText='Сохранить'
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName='modal-wrap'
            width='380px'
            closable={false}
            footer={(_, { OkBtn}) => (
                <>
                    <OkBtn />
                </>
            )}
            centered={true}
        >
            <InputLine value={link}
                       onChange={setLink}
                       placeholder='Ссылка'
            />
        </Modal>
    )
}