import {
  TIMER_SET,
  TIMER_START,
  TIMER_TICK,
  TIMER_STOP,
  TIMER_RESET
} from "./actions";

const initialState = {
  set_time: 300,
  remaining_time: 300,
  isTimed: false
};

const timerAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TIMER_SET:
      return {
        set_time: action.set_time
      };
    case TIMER_START:
    case TIMER_STOP:
      return {
        isTimed: !state.isTimed
      };
    case TIMER_TICK:
      return {
        remaining_time: (state.remaining_time -= 1)
      };
    case TIMER_RESET:
      return {
        remaining_time: state.set_time
      };
    default:
      return state;
  }
};

export default timerAppReducer;
