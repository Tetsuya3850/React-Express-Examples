const ADD_ARTICLES = "ADD_ARTICLES";

export const addArticles = articles => ({
  type: ADD_ARTICLES,
  articles
});

const initialState = {};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      return { ...state, ...action.articles };
    default:
      return state;
  }
};

export default articles;
