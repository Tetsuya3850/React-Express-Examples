const ADD_USERS = "ADD_USERS";

export const addUsers = users => ({
  type: ADD_USERS,
  users
});

const initialState = {};

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return { ...state, ...action.users };
    default:
      return state;
  }
};

export default users;
