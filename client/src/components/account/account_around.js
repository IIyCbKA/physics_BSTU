import RootAccount from "../../elements/account/root/root";
import './styles/style_account.css'

export default function AccountAround(props){
    return (
        <div className="around-account">
            <RootAccount setShow={props.setShow}/>
        </div>
    )
}
