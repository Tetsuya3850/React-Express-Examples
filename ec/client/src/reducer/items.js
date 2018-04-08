const FETCHING_ITEMS_SUCCESS = "FETCHING_ITEMS_SUCCESS";
const UPDATE_ITEM_STOCK = "UPDATE_ITEM_STOCK";
const UPDATE_ITEM_REVIEWS = "UPDATE_ITEM_REVIEWS";

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

export const updateItemReviews = (itemId, reviews) => {
  return {
    type: UPDATE_ITEM_REVIEWS,
    itemId,
    reviews
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
    case UPDATE_ITEM_REVIEWS:
      return {
        ...state,
        [action.itemId]: { ...state[action.itemId], reviews: action.reviews }
      };
    default:
      return state;
  }
};

export default items;
