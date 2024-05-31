import {Modal} from "antd";
import '../../../../modal/styles/style_modal.css'
import HeaderModal from "../../../../modal/header_modal";
import {downloadWorkFile} from "../../../../../actions/journal";
import FooterModalBtn from "../../../../modal/footer_button_pattern";


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
            title={<HeaderModal text='Прикрепленные файлы'/>}
            okText='Оценить'
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
                    <FooterModalBtn text='Вернуть' onClick={handleReturnClick}
                                    classes='modal-return-btn'/>
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