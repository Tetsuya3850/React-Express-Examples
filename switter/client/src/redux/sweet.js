import { addOwnSweet } from "./user";
import { postNewSweet } from "../api";

export const ADD_SWEET = "ADD_SWEET";

const addSweet = sweet => {
  return {
    type: ADD_SWEET,
    sweet
  };
};

export const addSweetThunk = sweet => async dispatch => {
  const new_sweet = await postNewSweet(sweet);
  dispatch(addSweet(new_sweet));
  dispatch(addOwnSweet(new_sweet));
};

const initialState = {
  feed: []
};

const sweet = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SWEET:
      return {
        feed: [...state.feed, action.sweet]
      };
    default:
      return state;
  }
};

export default sweet;
