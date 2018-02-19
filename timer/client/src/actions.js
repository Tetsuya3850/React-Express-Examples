export const SET_TIME = "SET_TIME";
export const TOGGLE_TIMER = "TOGGLE_TIMER";
export const RESET_TIMER = "RESET_TIMER";

const setTime = set_time => {
  dispatch({ type: SET_TIME, set_time });
};

const toggleTimer = () => {
  dispatch({ type: TOGGLE_TIMER });
};

const resetTimer = () => {
  dispatch({ type: RESET_TIMER });
};

const actions = {
  setTime,
  toggleTimer,
  resetTimer
};
export default actions;
