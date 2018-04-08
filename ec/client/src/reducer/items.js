const FETCHING_ITEMS_SUCCESS = "FETCHING_ITEMS_SUCCESS";
const UPDATE_ITEM_STOCK = "UPDATE_ITEM_STOCK";

export const fetchingItemsSuccess = items => {
  return {
    type: FETCHING_ITEMS_SUCCESS,
    items
  };
};

export const updateItemStock = (itemId, stock) => {
  return {
    type: UPDATE_ITEM_STOCK,
    itemId,
    stock
  };
};

const initialState = {};

const items = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_ITEMS_SUCCESS:
      return { ...state, ...action.items };
    case UPDATE_ITEM_STOCK:
      return {
        ...state,
        [action.itemId]: { ...state[action.itemId], stock: action.stock }
      };
    default:
      return state;
  }
};

export default items;
