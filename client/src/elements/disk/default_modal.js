import InputLine from "../modal/input_line";
import {Modal} from "antd";
import {useState} from "react";
import {useSelector} from "react-redux";
import {createFolder} from "../../actions/files";
import '../modal/styles/style_modal.css'
import HeaderModal from "../modal/header_modal";
import {
    DEFAULT_MODAL_CANCEL_BTN_TEXT,
    DEFAULT_MODAL_OK_BTN_TEXT
} from "../../constants";

const TITLE_TEXT = 'Укажите название папки'
const INPUT_PLACEHOLDER_TEXT = 'Новая папка'

export default function ModalWindow(props){
    const [folderName, setFolderName] = useState('')
    const path = useSelector(state => state.file.path)

    const handleCancel = () => {
        props.setModalOpen(false)
    }

    const handleOk = async () => {
        props.setAnchorEl(null);
        await createFolder(folderName, path)
        handleCancel()
    }

    return (
        <Modal
            open={props.show}
            title={<HeaderModal text={TITLE_TEXT}/>}
            okText={DEFAULT_MODAL_OK_BTN_TEXT}
            cancelText={DEFAULT_MODAL_CANCEL_BTN_TEXT}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{className: 'modal-cancel-btn modal-btn-font'}}
            okButtonProps={{className: 'modal-ok-btn modal-btn-font',
                disabled: folderName.length === 0}}
            wrapClassName='modal-wrap'
            closable={false}
            className='modal-root'
            zIndex='1500'
            footer={(_, {CancelBtn, OkBtn}) => (
                <>
                    <CancelBtn/>
                    <OkBtn />
                </>
            )}
            centered={true}
        >
            <InputLine
                value={folderName}
                onChange={setFolderName}
                placeholder={INPUT_PLACEHOLDER_TEXT}
                handleOk={handleOk}
            />
        </Modal>
    )
}