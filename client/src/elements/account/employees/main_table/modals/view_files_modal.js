import {Modal} from "antd";
import '../../../../modal/styles/style_modal.css'
import HeaderModal from "../../../../modal/header_modal";
import {downloadWorkFile} from "../../../../../actions/journal";
import FooterModalBtn from "../../../../modal/footer_button_pattern";
import {DEFAULT_MODAL_CANCEL_BTN_TEXT} from "../../../../../constants";

const TITLE_TEXT = 'Прикрепленные файлы'
const OK_BTN_TEXT = 'Оценить'
const RETURN_BTN_TEXT = 'Вернуть'

export default function ViewFilesModal(props){
    const handleCancel = () => {
        props.setShow(false)
        props.cleanSelectInfo()
    }

    const handleOk = () => {
        props.setShow(false);
        props.setModatlGradeOpen(true);
    }

    const handleReturnClick = () => {
        props.setShow(false)
        props.setModalReturnWorkOpen(true)
    }

    const handleDownloadFile = async (filename, fileID) => {
        await downloadWorkFile(filename, fileID)
    }

    return (
        <Modal
            open={props.show}
            title={<HeaderModal text={TITLE_TEXT}/>}
            okText={OK_BTN_TEXT}
            cancelText={DEFAULT_MODAL_CANCEL_BTN_TEXT}
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
                    <FooterModalBtn
                        text={RETURN_BTN_TEXT}
                        onClick={handleReturnClick}
                        classes='modal-return-btn'
                    />
                    <OkBtn />
                </>
            )}
            centered={true}
        >
            {props.work.works.map((file) =>
                <div className='modal-file-main' key={file.file_id}
                     onClick={() => handleDownloadFile(file.filename,
                         file.file_id)}>
                    <div className='modal-file-text'>
                        {file.filename}
                    </div>
                </div>
            )}
        </Modal>
    )
}