import RootAccount from "../../elements/account/root/root";
import './styles/style_account.css'
import AccountHead from "../../elements/account/head/head";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import {EMPLOYEE_USER_STATUS} from "../../constants";


export default function AccountAround(props){
    const userStatus = useSelector(state => state.user.currentUser.status)
    const firstText = 'Задания'
    const secondText = userStatus === EMPLOYEE_USER_STATUS ? 'Оценки' : 'Профиль'
    const [onFirstSelected, changeFirstSelected] = useState(true);
    const [onSecondSelected, changeSecondSelected] = useState(false);

    return (
        <div className="around-account">
            <Helmet>
                <title>{onFirstSelected ? firstText : secondText}</title>
            </Helmet>
            <div className='account-main'>
                <div className='account-root-content-inner'>
                    <div className='account-root-content-container'>
                        <AccountHead firstText={firstText}
                                     secondText={secondText}
                                     onFirstSelected={onFirstSelected}
                                     changeFirstSelected={changeFirstSelected}
                                     onSecondSelected={onSecondSelected}
                                     changeSecondSelected={changeSecondSelected}
                        />
                        <RootAccount
                            setShowTaskForm={props.setShowTaskForm}
                            setShowJournal={props.setShowJournal}
                            onFirstSelected={onFirstSelected}
                            openNotification={props.openNotification}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
