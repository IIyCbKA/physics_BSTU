import RootAccount from "../../elements/account/root/root";
import './styles/style_account.css'
import AccountHead from "../../elements/account/head/head";
import {employeeStatus} from "../../reducers/user_reducer";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Helmet} from "react-helmet";


export default function AccountAround(props){
    const userStatus = useSelector(state => state.user.currentUser.status)
    const firstText = 'Задания'
    const secondText = userStatus === employeeStatus ? 'Оценки' : 'Профиль'
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
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
