import { store } from "./Root";

const TIMER_SET = "TIMER_SET";
const TIMER_START = "TIMER_START";
const TIMER_TICK = "TIMER_TICK";
const TIMER_STOP = "TIMER_STOP";
const TIMER_RESET = "TIMER_RESET";

let timer = null;

export const setTimer = set_time => {
  return {
    type: TIMER_SET,
    set_time
  };
};

export const startTimer = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (store.getState().remaining_time === 0) {
      clearInterval(timer);
      dispatch({ type: TIMER_RESET });
      window.alert("Time Over!");
    } else {
      dispatch(tickTimer());
    }
  }, 1000);
  dispatch({ type: TIMER_START });
  dispatch(tickTimer());
};

const tickTimer = () => {
  return { type: TIMER_TICK };
};

export const stopTimer = () => {
  clearInterval(timer);
  return { type: TIMER_STOP };
};

export const resetTimer = () => {
  clearInterval(timer);
  return { type: TIMER_RESET };
};

const initialState = {
  set_time: 300,
  remaining_time: 300,
  is_timed: false
};

const timerAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TIMER_SET:
      return {
        ...state,
        set_time: action.set_time,
        remaining_time: action.set_time
      };
    case TIMER_START:
      return {
        ...state,
        is_timed: true
      };
    case TIMER_STOP:
      return {
        ...state,
        is_timed: false
      };
    case TIMER_TICK:
      return {
        ...state,
        remaining_time: state.remaining_time - 1
      };
    case TIMER_RESET:
      return {
        ...state,
        is_timed: false,
        remaining_time: state.set_time
      };
    default:
      return state;
  }
};

export default timerAppReducer;
