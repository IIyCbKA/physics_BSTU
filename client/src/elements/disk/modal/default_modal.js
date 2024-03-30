import InputLine from "./input_line";
import {Modal} from "antd";
import {useState} from "react";
import {useSelector} from "react-redux";
import {createFolder} from "../../../actions/files";
import './styles/style.css'
import HeaderModal from "./header_modal";

export default function ModalWindow(props){
    const [folderName, setFolderName] = useState('')

    const path = useSelector(state => state.file.path)

    const handleCancel = () => {
        props.handleClose()
    }

    const handleOk = async () => {
        //await createFolder(folderName, path)
        handleCancel()
    }

    return (
        <Modal
            open={props.show}
            title={<HeaderModal handlerClick={handleCancel}/>}
            okText='Сохранить'
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName='modal-wrap'
            width='420px'
            closable={false}
            footer={(_, { OkBtn}) => (
                <>
                    <OkBtn />
                </>
            )}
            centered={true}
        >
            <InputLine value={folderName} onChange={setFolderName}/>
        </Modal>
    )
}