export const getToken = () => localStorage.getItem("jwt-token");

export const saveToken = token => localStorage.setItem("jwt-token", token);

export const removeToken = () => localStorage.removeItem("jwt-token");

export const getTokenInfo = () => {
  try {
    const token = getToken();
    if (token) {
      const payload = window.atob(token.split(".")[1]);
      return JSON.parse(payload);
    }
  } catch (error) {
    console.error(error);
  }
};

export const isAuthed = () => {
  const token_info = getTokenInfo();
  if (token_info && token_info.exp > Math.round(new Date() / 1000)) {
    return token_info._id;
  } else {
    return false;
  }
};
