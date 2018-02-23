import { SET_MOVE, CHANGE_TURN, HAS_WON } from "./actions";

const initialState = {
  ticTacToe: [null, null, null, null, null, null, null, null, null],
  turn: true,
  hasWon: false
};

const set_move_helper = (state, pos, turn) => {
  const newTicTacToe = state.slice();
  newTicTacToe[pos] = turn;
  console.log(newTicTacToe);
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
    default:
      return state;
  }
};

export default ticTacToeReducer;
