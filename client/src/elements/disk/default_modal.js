import InputLine from "../modal/input_line";
import {Modal} from "antd";
import {useState} from "react";
import {useSelector} from "react-redux";
import {createFolder} from "../../actions/files";
import '../modal/styles/style_modal.css'
import HeaderModal from "../modal/header_modal";

export default function ModalWindow(props){
    const [folderName, setFolderName] = useState('')

    const path = useSelector(state => state.file.path)

    const handleCancel = () => {
        props.handleClose()
    }

    const handleOk = async () => {
        await createFolder(folderName, path)
        handleCancel()
    }

    return (
        <Modal
            open={props.show}
            title={<HeaderModal text='Укажите название папки'
                                handleClick={handleCancel}/>}
            okText='Сохранить'
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName='modal-wrap'
            closable={false}
            className='modal-root'
            footer={(_, { OkBtn}) => (
                <>
                    <OkBtn />
                </>
            )}
            centered={true}
        >
            <InputLine value={folderName}
                       onChange={setFolderName}
                       placeholder='Новая папка'
            />
        </Modal>
    )
}