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

async function fbAuth() {
  const response = await fetch("/auth/facebook", {
    method: "get"
  });
  return await response.json();
}

async function getSecret(uid) {
  const response = await fetch(`/secret/${uid}`, {
    method: "get",
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}

const api = {
  register,
  login,
  fbAuth,
  getSecret
};
export default api;
