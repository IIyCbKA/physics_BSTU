const SET_FILES = "SET_FILES";
const SET_PATH = "SET_PATH";
const SELECTED_FILE = "SELECTED_FILE";
const CLOSE_SELECTED = "CLOSE_SELECTED";
const ADD_DISK_UPLOAD_PROGRESS = "ADD_DISK_UPLOAD_PROGRESS";
const CLEAN_UPLOAD_LIST = "CLEAN_UPLOAD_LIST";

const defaultState = {
  files: [],
  upload_list: {},
  path: "/",
  selected_id: null,
  selected_name: null,
  selected_type: null,
  selected_size: null,
  type_last_closed: null,
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_PATH:
      return { ...state, path: action.payload };
    case SELECTED_FILE:
      return {
        ...state,
        selected_id: action.payload.id,
        selected_name: action.payload.name,
        selected_type: action.payload.type,
        selected_size: action.payload.size,
      };
    case CLOSE_SELECTED:
      return {
        ...state,
        type_last_closed: state.selected_type,
        selected_id: null,
        selected_name: null,
        selected_type: null,
        selected_size: null,
      };
    case ADD_DISK_UPLOAD_PROGRESS:
      return {
        ...state,
        upload_list: {
          ...state.upload_list,
          [action.payload.fileName]: action.payload.info,
        },
      };
    case CLEAN_UPLOAD_LIST:
      return {
        ...state,
        upload_list: {}
      };
    default:
      return state;
  }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setPath = (path) => ({ type: SET_PATH, payload: path });
export const selectedFile = (
  selected_id,
  selected_name,
  selected_type,
  selected_size,
) => ({
  type: SELECTED_FILE,
  payload: {
    id: selected_id,
    name: selected_name,
    type: selected_type,
    size: selected_size,
  },
});
export const cleanSelectedInfo = () => ({ type: CLOSE_SELECTED });
export const addUploadProgress = (fileName, info) => ({
  type: ADD_DISK_UPLOAD_PROGRESS,
  payload: { fileName, info },
});
export const cleanUploadList = () => ({ type: CLEAN_UPLOAD_LIST });