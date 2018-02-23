export const SET_MOVE = "SET_MOVE";
export const CHANGE_TURN = "CHANGE_TURN";
export const HAS_WON = "HAS_WON";

const setMove = (pos, player) => {
  return {
    type: SET_MOVE,
    pos,
    player
  };
};

const changeTurn = () => {
  return { type: CHANGE_TURN };
};

const hasWon = () => {
  return { type: HAS_WON };
};

const actions = {
  setMove,
  changeTurn,
  hasWon
};
export default actions;
