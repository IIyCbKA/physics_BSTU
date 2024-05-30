import InputLine from "../../../../modal/input_line";
import {Modal} from "antd";
import {useState} from "react";
import '../../../../modal/styles/style_modal.css'
import HeaderModal from "../../../../modal/header_modal";
import {setStudentGrade} from "../../../../../actions/journal";

export default function ChangeGradeModal(props){
    const [grade, setGrade] = useState(props.work && props.work.grade.grade ?
        props.work.grade.grade : '')

    const handleCancel = () => {
        props.setShow(false)
    }

    const handleOk = async () => {
        props.setAnchorEl(null);
        await setStudentGrade(props.work.id, props.studentID, grade)
        props.selectInfoClean();
        handleCancel()
    }

    return (
        <Modal
            open={props.show}
            title={<HeaderModal text='Изменить оценку'/>}
            okText='Сохранить'
            cancelText='Отмена'
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{className: 'modal-cancel-btn modal-btn-font'}}
            okButtonProps={{className: 'modal-ok-btn modal-btn-font',
                disabled: grade.length === 0}}
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
                value={grade}
                onChange={setGrade}
                placeholder='Новая оценка'
                handleOk={handleOk}
            />
        </Modal>
    )
}