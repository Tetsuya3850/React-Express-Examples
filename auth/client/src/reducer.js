import { AUTH_USER, UNAUTH_USER } from "./actions";

const initialState = {
  isAuthed: false,
  userInfo: {
    _id: "",
    name: "",
    email: "",
    exp: 0,
    iat: 0
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        isAuthed: true,
        userInfo: action.userInfo
      };
    case UNAUTH_USER:
      return {
        isAuthed: false,
        userInfo: {
          id: "",
          name: "",
          email: "",
          exp: 0,
          iat: 0
        }
      };
    default:
      return state;
  }
};

export default authReducer;
