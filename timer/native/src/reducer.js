import { store } from "../App";
import { Alert } from "react-native";

const SET_TIMER = "SET_TIMER";
const START_TIMER = "START_TIMER";
const TICK_TIMER = "TICK_TIMER";
const STOP_TIMER = "STOP_TIMER";
const RESET_TIMER = "RESET_TIMER";

let timer = null;

export const setTimer = set_time => {
  return {
    type: SET_TIMER,
    set_time
  };
};

export const startTimer = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (store.getState().remaining_time === 0) {
      Alert.alert("Time Over!", "Stop your work!!", [{ text: "OK" }]);
      dispatch(resetTimer());
    } else {
      dispatch(tickTimer());
    }
  }, 1000);
  dispatch({ type: START_TIMER });
  dispatch(tickTimer());
};

const tickTimer = () => {
  return { type: TICK_TIMER };
};

export const stopTimer = () => {
  clearInterval(timer);
  return { type: STOP_TIMER };
};

export const resetTimer = () => {
  clearInterval(timer);
  return { type: RESET_TIMER };
};

const initialState = {
  set_time: 300,
  remaining_time: 300,
  is_timed: false
};

const timerAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMER:
      return {
        ...state,
        set_time: action.set_time,
        remaining_time: action.set_time
      };
    case START_TIMER:
      return {
        ...state,
        is_timed: true
      };
    case STOP_TIMER:
      return {
        ...state,
        is_timed: false
      };
    case TICK_TIMER:
      return {
        ...state,
        remaining_time: state.remaining_time - 1
      };
    case RESET_TIMER:
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
