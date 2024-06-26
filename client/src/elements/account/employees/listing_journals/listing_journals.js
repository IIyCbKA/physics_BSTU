import { useSelector } from "react-redux";
import "../../common_styles/common_account_styles.css";
import Journal from "../../../../utils/journal/journal";
import { useState } from "react";

export default function ListingJournals(props) {
  const journals = useSelector((state) => state.journal.groups);
  const [journalLoadID, setJournalLoadID] = useState(null);

  return (
    <div className="listing-account-root">
      {journals.map((journal, index) => (
        <Journal
          key={journal.id}
          id={journal.id}
          groupName={journal.name}
          isLast={index === journals.length - 1}
          setShow={props.setShow}
          isLoad={journalLoadID === journal.id}
          setJournalLoadID={setJournalLoadID}
        />
      ))}
    </div>
  );
}
