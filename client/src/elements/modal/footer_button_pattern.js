import './styles/style_modal.css'

export default function FooterModalBtn(props){
    return (
        <div className={'modal-footer-btn-wrap ' + (props.classes ?
            props.classes : '')} onClick={props.onClick}>
            <div className='modal-btn-font'>
                {props.text}
            </div>
        </div>
    )
}