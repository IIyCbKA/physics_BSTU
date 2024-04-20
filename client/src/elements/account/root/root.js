import EmployeeHead from "../employees/head/head";
import './styles/style_root_account.css'
import CreateTask from "../employees/create_task_btn/create_task_btn";

export default function RootAccount(props){
    return(
        <div className='account-main'>
            <div className='account-root-content-inner'>
                <div className='account-root-content-container'>
                    <EmployeeHead/>
                    <CreateTask setShow={props.setShow}/>
                </div>
            </div>
        </div>
    )
}