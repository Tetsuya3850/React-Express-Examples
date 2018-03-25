import { judgeWinHelper, judgeFairHelper } from "./helper";
import { store } from "../App";

const SET_MOVE = "SET_MOVE";
const CHANGE_TURN = "CHANGE_TURN";
const HAS_WON = "HAS_WON";
const IS_FAIR = "IS_FAIR";
const NEW_GAME = "NEW_GAME";

const setMove = (pos, turn) => {
  return {
    type: SET_MOVE,
    pos,
    turn
  };
};

const changeTurn = () => {
  return { type: CHANGE_TURN };
};

const hasWon = () => {
  return { type: HAS_WON };
};

const isFair = () => {
  return { type: IS_FAIR };
};

export const newGame = () => {
  return { type: NEW_GAME };
};

export const processMove = (pos, turn) => dispatch => {
  dispatch(setMove(pos, turn));
  const ticTacToe = store.getState().ticTacToe;
  if (judgeWinHelper(ticTacToe)) {
    dispatch(hasWon());
  } else if (judgeFairHelper(ticTacToe)) {
    dispatch(isFair());
  } else {
    dispatch(changeTurn());
  }
};

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
    case NEW_GAME:
      return initialState;
    default:
      return state;
  }
};

export default ticTacToeReducer;
