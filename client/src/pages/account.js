import AccountAround from "../components/account/account_around";
import Header from "../components/header/header";

export default function Account(props){
    return (
        <div style={{backgroundColor: '#EBF0FF'}}>
            <Header orientation={props.orientation}/>
            <AccountAround/>
        </div>
    )
}