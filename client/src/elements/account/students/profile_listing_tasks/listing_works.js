import { useSelector } from "react-redux";
import "../../common_styles/common_account_styles.css";
import Work from "../../../../utils/work/work";
import { useState } from "react";

export default function ListingWork() {
  const tasks = useSelector((state) => state.journal.tasks);
  const [activeTaskID, setActiveTask] = useState(null);

  return (
    <div className="listing-account-root">
      {tasks.map((work, index) => (
        <Work
          title={work.title}
          id={work.id}
          key={work.id}
          files={work.works}
          grade={work.grade}
          isLast={index === tasks.length - 1}
          isActive={activeTaskID === work.id}
          setActiveID={setActiveTask}
        />
      ))}
    </div>
  );
}
