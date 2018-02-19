import { SET_TIMER, TOGGLE_TIMER, RESET_TIMER } from "./actions";

const initialState = {
  set_time: {
    h: 0,
    m: 5,
    s: 0
  },
  remaining_time: {
    h: 0,
    m: 5,
    s: 0
  },
  isTimed: false
};

const timerAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMER:
      return {
        set_time: action.set_time
      };
    case TOGGLE_TIMER:
      return {
        isTimed: !state.isTimed
      };
    case RESET_TIMER:
      return {
        remaining_time: { ...state.set_time }
      };
    default:
      return state;
  }
};

export default timerAppReducer;
