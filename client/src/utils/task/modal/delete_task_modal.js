import {Modal} from "antd";
import '../../../elements/modal/styles/style_modal.css'
import HeaderModal from "../../../elements/modal/header_modal";
import {deleteTask} from "../../../actions/journal";

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
            title={<HeaderModal text='Удалить задание?'
                                handleClick={handleCancel}/>}
            okText='Удалить'
            cancelText='Отмена'
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
                Оценки и комментарии также будут удалены.
            </div>
        </Modal>
    )
}