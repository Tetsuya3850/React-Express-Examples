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

async function getSecret() {
  const response = await fetch("/secret", {
    method: "get",
    Authorization: `Bearer ${getToken()}`
  });
  console.log(await response.json());
}

const api = {
  register,
  login,
  getSecret
};
export default api;
