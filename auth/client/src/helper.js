export const getToken = () => localStorage.getItem("jwt-token");
export const saveToken = token => localStorage.setItem("jwt-token", token);
export const removeToken = () => localStorage.removeItem("jwt-token");

export const getUserInfo = () => {
  try {
    const token = getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

export const parseToken = token => {
  try {
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  } catch (e) {
    console.log(e);
  }
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
