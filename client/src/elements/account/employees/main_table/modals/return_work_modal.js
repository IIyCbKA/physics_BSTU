import {Modal} from "antd";
import '../../../../modal/styles/style_modal.css'
import HeaderModal from "../../../../modal/header_modal";
import {returnStudentWork} from "../../../../../actions/journal";

export default function ReturnWorkModal(props){
    const handleCancel = () => {
        props.setShow(false)
    }

    const handleOk = async () => {
        await returnStudentWork(props.work.id, props.studentID)
        props.setAnchorEl(null)
        handleCancel()
    }

    return (
        <Modal
            open={props.show}
            title={<HeaderModal text='Вернуть работу?'/>}
            okText='Вернуть'
            cancelText='Отмена'
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{className: 'modal-cancel-btn modal-btn-font'}}
            okButtonProps={{className: 'modal-ok-btn modal-btn-font'}}
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
            <div className='modal-body-text'>
                Вы хотите вернуть студенту его работу?
            </div>
        </Modal>
    )
}