const SET_SELECTED_GROUP = "SET_SELECTED_GROUP";
const FREE_SELECTED_GROUP = "FREE_SELECTED_GROUP";
const UPDATE_GRADE_EMPLOYEE = "UPDATE_GRADE_EMPLOYEE";

const defaultState = {
  students: [],
  tasks: [],
  groupID: null,
  groupName: null,
};

export default function selectedGroupReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SELECTED_GROUP:
      return {
        ...state,
        students: action.payload.students,
        groupID: action.payload.groupID,
        groupName: action.payload.groupName,
        tasks: action.payload.tasks,
      };
    case FREE_SELECTED_GROUP:
      return {
        ...state,
        students: [],
        groupID: null,
        groupName: null,
        tasks: [],
      };
    case UPDATE_GRADE_EMPLOYEE:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.student_id
            ? {
                ...student,
                works: student.works.map((work) =>
                  work.id === action.payload.task_id
                    ? {
                        ...work,
                        grade: action.payload.grade,
                        works:
                          action.payload.work_files === null
                            ? work.works
                            : action.payload.work_files,
                      }
                    : work,
                ),
              }
            : student,
        ),
      };
    default:
      return state;
  }
}

export const setSelectedGroup = (groupInfo) => ({
  type: SET_SELECTED_GROUP,
  payload: groupInfo,
});
export const freeSelectedGroup = () => ({
  type: FREE_SELECTED_GROUP,
  payload: null,
});
export const updateGradeEmployee = (gradeInfo) => ({
  type: UPDATE_GRADE_EMPLOYEE,
  payload: gradeInfo,
});
