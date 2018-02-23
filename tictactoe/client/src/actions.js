import { judgeHelper } from "./helper";
import { store } from "./Root";

export const SET_MOVE = "SET_MOVE";
export const CHANGE_TURN = "CHANGE_TURN";
export const HAS_WON = "HAS_WON";

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

const processMove = (pos, turn) => dispatch => {
  console.log(pos);
  console.log(turn);
  dispatch(setMove(pos, turn));
  if (judgeHelper(store.getState().ticTacToe)) {
    dispatch(hasWon());
  } else {
    dispatch(changeTurn());
  }
};

const actions = {
  processMove
};
export default actions;
