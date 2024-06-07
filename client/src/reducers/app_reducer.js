const SET_ORIENTATION = "SET_ORIENTATION";
const SET_WIDTH = "SET_WIDTH";
const SET_HEIGHT = "SET_HEIGHT";

const defaultState = {
  orientation: "",
  width: 0,
  height: 0,
};

export default function AppReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ORIENTATION:
      return { ...state, orientation: action.payload };
    case SET_WIDTH:
      return { ...state, width: action.payload };
    case SET_HEIGHT:
      return { ...state, height: action.payload };
    default:
      return state;
  }
}

export const setOrientation = (orientation) => ({
  type: SET_ORIENTATION,
  payload: orientation,
});
export const setWidth = (width) => ({ type: SET_WIDTH, payload: width });
export const setHeight = (height) => ({ type: SET_HEIGHT, payload: height });
