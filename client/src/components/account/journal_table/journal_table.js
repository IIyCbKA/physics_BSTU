import '../common_styles/common_styles_account_components.css'
import FormsHeader from "../../../utils/forms_elements/header/forms_header";

export default function JournalTable(props){
    const tableStyle = () => {
        return {
            opacity: props.show ? 1 : 0,
            visibility: props.show ? 'visible' : 'hidden',
            height: '100%'
        }
    }

    return (
        <div className='forms-wrap' style={tableStyle()}>
            <FormsHeader setShow={props.setShow} isJournal={true}/>
        </div>
    )
}