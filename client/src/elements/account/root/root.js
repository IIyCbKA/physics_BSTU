import EmployeeHead from "../employees/head/head";
import './styles/style_root_account.css'
import CreateTask from "../employees/create_task_btn/create_task_btn";
import ListingTask from "../listing_tasks/listing_task";
import Head from "../listing_tasks/head/head";

export default function RootAccount(props){
    return(
        <div className='account-main'>
            <div className='account-root-content-inner'>
                <div className='account-root-content-container'>
                    <EmployeeHead/>
                    <div className='account-info-wrap'>
                        <div className='account-info-main'>
                            <CreateTask setShow={props.setShow}/>
                            <Head/>
                            <ListingTask/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}