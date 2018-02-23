import { judgeWinHelper, judgeFairHelper } from "./helper";
import { store } from "./Root";

export const SET_MOVE = "SET_MOVE";
export const CHANGE_TURN = "CHANGE_TURN";
export const HAS_WON = "HAS_WON";
export const IS_FAIR = "IS_FAIR";

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

const processMove = (pos, turn) => dispatch => {
  dispatch(setMove(pos, turn));
  const ticTacToe = store.getState().ticTacToe;
  if (judgeWinHelper(ticTacToe)) {
    dispatch(hasWon());
    return;
  }
  if (judgeFairHelper(ticTacToe)) {
    dispatch(isFair());
    return;
  }
  dispatch(changeTurn());
};

const actions = {
  processMove
};
export default actions;
