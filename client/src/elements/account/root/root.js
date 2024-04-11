import EmployeeHead from "../employees/head/head";
import './styles/style_root_account.css'

export default function RootAccount(){
    return(
        <div className='account-main'>
            <div className='account-root-content-inner'>
                <div className='account-root-content-container'>
                    <EmployeeHead/>
                </div>
            </div>
        </div>
    )
}