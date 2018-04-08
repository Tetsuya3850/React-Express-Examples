import { getAll, getCategory, getSearch } from "../api";
import { fetchingItemsSuccess } from "./items";
import { normalizeItems, selectItemIds } from "../helper";

const FETCHING_LIST = "FETCHING_LIST";
const FETCHING_LIST_ERROR = "FETCHING_LIST_ERROR";
const FETCHING_LIST_SUCCESS = "FETCHING_LIST_SUCCESS";

const fetchingList = () => {
  return {
    type: FETCHING_LIST
  };
};

const fetchingListError = error => {
  return {
    type: FETCHING_LIST_ERROR,
    error
  };
};

const fetchingListSuccess = itemIds => {
  return {
    type: FETCHING_LIST_SUCCESS,
    itemIds
  };
};

export const handleFetchListItems = () => async dispatch => {
  dispatch(fetchingList());
  try {
    const { data } = await getAll();
    const normalizedListItems = normalizeItems(data);
    const listItemIds = selectItemIds(data);
    dispatch(fetchingItemsSuccess(normalizedListItems));
    dispatch(fetchingListSuccess(listItemIds));
  } catch (e) {
    dispatch(fetchingListError("Hmm, Something's Wrong.."));
  }
};

export const handleFetchListCategory = key => async dispatch => {
  dispatch(fetchingList());
  try {
    const { data } = await getCategory(key);
    const normalizedListItems = normalizeItems(data);
    const listItemIds = selectItemIds(data);
    dispatch(fetchingItemsSuccess(normalizedListItems));
    dispatch(fetchingListSuccess(listItemIds));
  } catch (e) {
    dispatch(fetchingListError("Hmm, Something's Wrong.."));
  }
};

export const handleFetchListSearch = query => async dispatch => {
  dispatch(fetchingList());
  try {
    const { data } = await getSearch(query);
    const normalizedListItems = normalizeItems(data);
    const listItemIds = selectItemIds(data);
    dispatch(fetchingItemsSuccess(normalizedListItems));
    dispatch(fetchingListSuccess(listItemIds));
  } catch (e) {
    dispatch(fetchingListError("Hmm, Something's Wrong.."));
  }
};

const initialState = {
  isFetching: false,
  error: "",
  itemIds: []
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_LIST:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_LIST_ERROR:
      return {
        isFetching: false,
        error: action.error,
        itemIds: []
      };
    case FETCHING_LIST_SUCCESS:
      return {
        isFetching: false,
        error: "",
        itemIds: action.itemIds
      };
    default:
      return state;
  }
};

export default list;
