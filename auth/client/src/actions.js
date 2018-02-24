export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";

const authUser = userInfo => {
  return {
    type: AUTH_USER,
    userInfo
  };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const actions = {
  authUser,
  unAuthUser
};
export default actions;
