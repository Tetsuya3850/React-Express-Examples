export const getToken = () => localStorage.getItem("jwt-token");
export const saveToken = token => localStorage.setItem("jwt-token", token);
export const removeToken = () => localStorage.removeItem("jwt-token");

export const getUserInfo = () => {
  const token = getToken();
  let payload;
  if (token) {
    payload = token.split(".")[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  } else {
    return null;
  }
};

export const parseToken = token => {
  let payload;
  payload = token.split(".")[1];
  payload = window.atob(payload);
  return JSON.parse(payload);
};

export const formatErrors = status => {
  let err = {};
  if (status.code === 11000) {
    err.email = "Duplicate email!";
  } else {
    Object.keys(status.errors).map(key => {
      err[key] = status.errors[key].message;
    });
  }
  return err;
};
