export const TIMER_SET = "TIMER_SET";
export const TIMER_START = "TIMER_START";
export const TIMER_TICK = "TIMER_TICK";
export const TIMER_STOP = "TIMER_STOP";
export const TIMER_RESET = "TIMER_RESET";

let timer = null;

const setTime = set_time => {
  type: TIMER_SET, set_time;
};

const startTimer = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tickTimer()), 1000);
  dispatch({ type: TIMER_START });
  dispatch(tickTimer());
};

const tickTimer = () => {
  type: TIMER_TICK;
};

const stopTimer = () => {
  clearInterval(timer);
  return { type: TIMER_STOP };
};

const resetTimer = () => {
  clearInterval(timer);
  return { type: TIMER_RESET };
};

const actions = {
  setTime,
  startTimer,
  tickTimer,
  stopTimer,
  resetTimer
};
export default actions;
