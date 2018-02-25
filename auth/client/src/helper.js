export function getToken() {
  return localStorage.getItem("jwt-token");
}

export function saveToken(token) {
  localStorage.setItem("jwt-token", token);
}

export function removeToken() {
  localStorage.removeItem("jwt-token");
}

export function getUserInfo() {
  const token = getToken();
  let payload;
  if (token) {
    payload = token.split(".")[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  } else {
    return null;
  }
}

export function formatErrors(status) {
  let err = {};
  if (status.code === 11000) {
    err.email = "Duplicate email!";
  } else {
    Object.keys(status.errors).map(key => {
      err[key] = status.errors[key].message;
    });
  }
  return err;
}
