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
            title={<HeaderModal text='Укажите название папки'/>}
            okText='Сохранить'
            cancelText='Отмена'
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{className: 'modal-cancel-btn modal-btn-font'}}
            okButtonProps={{className: 'modal-ok-btn modal-btn-font'}}
            wrapClassName='modal-wrap'
            closable={false}
            className='modal-root'
            footer={(_, { CancelBtn, OkBtn}) => (
                <>
                    <CancelBtn/>
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