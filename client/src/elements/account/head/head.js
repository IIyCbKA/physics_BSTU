import './styles/style_account_head.css'
import AccountNavigateBtn from "../navigate_button/button";


export default function AccountHead(props){
    return (
        <div className='head'>
            <AccountNavigateBtn
                text={props.firstText}
                selected={props.onFirstSelected}
                changeSelected={props.changeFirstSelected}
                otherSelected={props.onSecondSelected}
                changeOtherSelected={props.changeSecondSelected}
            />

            <AccountNavigateBtn
                text={props.secondText}
                selected={props.onSecondSelected}
                changeSelected={props.changeSecondSelected}
                otherSelected={props.onFirstSelected}
                changeOtherSelected={props.changeFirstSelected}
            />
        </div>
    )
}