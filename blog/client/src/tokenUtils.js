export const getToken = () => localStorage.getItem("jwt-token");

export const saveToken = token => localStorage.setItem("jwt-token", token);

export const removeToken = () => localStorage.removeItem("jwt-token");

export const parseToken = () => {
  try {
    const token = getToken();
    if (token) {
      let payload;
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }
  } catch (error) {
    console.error(error);
  }
};

export const isAuthed = () => {
  const token_info = parseToken();
  if (token_info && token_info.exp > Math.round(new Date() / 1000)) {
    return token_info._id;
  } else {
    return false;
  }
};
