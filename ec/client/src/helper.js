export const getToken = () => localStorage.getItem("jwt-token");
export const saveToken = token => localStorage.setItem("jwt-token", token);
export const removeToken = () => localStorage.removeItem("jwt-token");

export const getOwnInfo = () => {
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

export const normalizeItems = items => {
  const normalizedItems = {};
  items.forEach(item => {
    normalizedItems[item._id] = item;
  });
  return normalizedItems;
};

export const selectItemIds = items => {
  return items.map(item => item._id);
};
