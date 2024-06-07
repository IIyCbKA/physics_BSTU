import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./styles/style_root_account.css";
import CreateTask from "../employees/create_task_btn/create_task_btn";
import ListingTask from "../listing_tasks/listing_task";
import TasksHead from "../listing_tasks/head/head";
import { useSelector } from "react-redux";
import UserInfo from "../user_info/user_info";
import ListingWork from "../students/profile_listing_tasks/listing_works";
import ListingJournals from "../employees/listing_journals/listing_journals";
import { EMPLOYEE_USER_STATUS, STUDENT_USER_STATUS } from "../../../constants";

export default function RootAccount(props) {
  const userStatus = useSelector((state) => state.user.currentUser.status);

  return (
    <div className="account-info-wrap">
      <div className="account-info-main">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={props.onFirstSelected ? "tasks" : "evaluations"}
            in={props.onFirstSelected}
            timeout={150}
            classNames="account-transition"
          >
            {props.onFirstSelected ? (
              <div className="account-tasks-main">
                {userStatus === EMPLOYEE_USER_STATUS && (
                  <CreateTask setShow={props.setShowTaskForm} />
                )}
                <TasksHead />
                <ListingTask openNotification={props.openNotification} />
              </div>
            ) : (
              <div className="account-evaluation-main">
                <UserInfo />
                {userStatus === STUDENT_USER_STATUS && <ListingWork />}
                {userStatus === EMPLOYEE_USER_STATUS && (
                  <ListingJournals setShow={props.setShowJournal} />
                )}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
