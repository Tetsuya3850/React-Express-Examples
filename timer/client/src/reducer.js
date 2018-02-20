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
