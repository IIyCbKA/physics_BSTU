import './styles/emplyee_head.css'
import AccountEmployeeNavigateBtn
    from "../../../elements/account/navigate_button/button";
import {useState} from "react";


export default function EmployeeHead(){
    const [onTasksSelected, changeTasksSelected] = useState(true);
    const [onJournalsSelected, changeJournalsSelected] = useState(false);

    return (
        <div className='head'>
            <AccountEmployeeNavigateBtn
                text='Задания'
                selected={onTasksSelected}
                changeSelected={changeTasksSelected}
                otherSelected={onJournalsSelected}
                changeOtherSelected={changeJournalsSelected}
            />

            <AccountEmployeeNavigateBtn
                text='Журналы'
                selected={onJournalsSelected}
                changeSelected={changeJournalsSelected}
                otherSelected={onTasksSelected}
                changeOtherSelected={changeTasksSelected}
            />
        </div>
    )
}