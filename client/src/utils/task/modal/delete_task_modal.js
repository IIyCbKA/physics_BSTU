import {Modal} from "antd";
import '../../../elements/modal/styles/style_modal.css'
import HeaderModal from "../../../elements/modal/header_modal";
import {deleteTask} from "../../../actions/journal";
import {DEFAULT_MODAL_CANCEL_BTN_TEXT} from "../../../constants";

const TITLE_TEXT = 'Удалить задание?'
const OK_BTN_TEXT = 'Удалить'
const BODY_TEXT = 'Оценки и комментарии также будут удалены.'

export default function DeleteTaskModal(props){
    const handleCancel = () => {
        props.setShowModal(false)
    }

    const handleOk = async () => {
        await deleteTask(props.taskID)
        handleCancel()
    }

    return (
        <Modal
            open={props.isShow}
            title={<HeaderModal text={TITLE_TEXT}
                                handleClick={handleCancel}/>}
            okText={OK_BTN_TEXT}
            cancelText={DEFAULT_MODAL_CANCEL_BTN_TEXT}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{className: 'modal-cancel-btn modal-btn-font'}}
            okButtonProps={{className: 'modal-ok-btn modal-btn-font'}}
            wrapClassName='modal-wrap'
            closable={false}
            className='modal-root'
            footer={(_, { OkBtn, CancelBtn}) => (
                <>
                    <CancelBtn />
                    <OkBtn/>
                </>
            )}
            centered={true}
        >
            <div className='modal-body-text'>
                {BODY_TEXT}
            </div>
        </Modal>
    )
}