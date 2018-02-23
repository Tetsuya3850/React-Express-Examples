import { SET_MOVE, CHANGE_TURN, HAS_WON, IS_FAIR } from "./actions";

const initialState = {
  ticTacToe: [null, null, null, null, null, null, null, null, null],
  turn: true,
  hasWon: false,
  isFair: false
};

const set_move_helper = (state, pos, turn) => {
  const newTicTacToe = state.slice();
  newTicTacToe[pos] = turn;
  return newTicTacToe;
};

const ticTacToeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVE:
      return {
        ...state,
        ticTacToe: set_move_helper(state.ticTacToe, action.pos, action.turn)
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: !state.turn
      };
    case HAS_WON:
      return {
        ...state,
        hasWon: !state.hasWon
      };
    case IS_FAIR:
      return {
        ...state,
        isFair: !state.isFair
      };
    default:
      return state;
  }
};

export default ticTacToeReducer;
