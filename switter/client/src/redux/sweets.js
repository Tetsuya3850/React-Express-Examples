export const RECEIVE_SWEETS = "RECEIVE_SWEETS";

export const receiveSweets = sweets => {
  return {
    type: RECEIVE_SWEETS,
    sweets
  };
};

const initialState = {};

const sweets = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SWEETS:
      return { ...state, ...action.sweets };
    default:
      return state;
  }
};

export default sweets;
