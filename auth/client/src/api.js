import { getToken } from "./helper";

async function register(userInfo) {
  const response = await fetch("/register", {
    method: "post",
    body: JSON.stringify(userInfo),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return await response.json();
}

async function login(userInfo) {
  const response = await fetch("/login", {
    method: "post",
    body: JSON.stringify(userInfo),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return await response.json();
}

async function getProfile() {
  const response = await fetch("/profile", {
    method: "get",
    Authorization: `Bearer ${getToken()}`
  });
  return await response.json();
}

const api = {
  register,
  login,
  getProfile
};
export default api;
