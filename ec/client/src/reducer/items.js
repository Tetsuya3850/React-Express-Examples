const FETCHING_ITEMS_SUCCESS = "FETCHING_ITEMS_SUCCESS";

export const fetchingItemsSuccess = items => {
  return {
    type: FETCHING_ITEMS_SUCCESS,
    items
  };
};

const initialState = {};

const items = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_ITEMS_SUCCESS:
      return { ...state, ...action.items };
    default:
      return state;
  }
};

export default items;
