const SET_GROUPS = "SET_GROUPS";
const SET_TASKS = "SET_TASKS";
const SET_UPDATE_TASK = "SET_UPDATE_TASK";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const ADD_WORK = "ADD_WORK";
const DELETE_WORK = "DELETE_WORK";
const UPDATE_GRADE_STUDENT = "UPDATE_GRADE_STUDENT";

const defaultState = {
  groups: [],
  tasks: [],
  updatingTask: {},
};

export default function journalReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, groups: action.payload };
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case SET_UPDATE_TASK:
      return { ...state, updatingTask: action.payload };
    case ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case ADD_WORK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.task_id
            ? { ...task, works: [...task.works, action.payload.work] }
            : task,
        ),
      };
    case DELETE_WORK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.task_id
            ? {
                ...task,
                works: task.works.filter(
                  (work) => work.file_id !== action.payload.work.file_id,
                ),
              }
            : task,
        ),
      };
    case UPDATE_GRADE_STUDENT:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.task_id
            ? { ...task, grade: action.payload.grade }
            : task,
        ),
      };
    default:
      return state;
  }
}

export const setGroups = (groups) => ({ type: SET_GROUPS, payload: groups });
export const setTasks = (tasks) => ({ type: SET_TASKS, payload: tasks });
export const setUpdatingTask = (task) => ({
  type: SET_UPDATE_TASK,
  payload: task,
});
export const addTask = (task) => ({ type: ADD_TASK, payload: task });
export const deleteTask = (taskID) => ({ type: DELETE_TASK, payload: taskID });
export const updateTask = (task) => ({ type: UPDATE_TASK, payload: task });
export const addWork = (work) => ({ type: ADD_WORK, payload: work });
export const deleteWork = (work) => ({ type: DELETE_WORK, payload: work });
export const updateGradeStudent = (gradeInfo) => ({
  type: UPDATE_GRADE_STUDENT,
  payload: gradeInfo,
});
