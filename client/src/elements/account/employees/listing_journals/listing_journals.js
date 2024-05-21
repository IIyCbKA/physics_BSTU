import {useSelector} from "react-redux";
import '../../common_styles/common_account_styles.css'
import Journal from "../../../../utils/journal/journal";

export default function ListingJournals(){
    const journals = useSelector(state => state.journal.groups);

    return (
        <div className='listing-account-root'>
            {journals.map((journal, index) => (
                <Journal
                    key={journal.id}
                    id={journal.id}
                    groupName={journal.name}
                    isLast={index === journals.length - 1}
                />
            ))}
        </div>
    )
}