import { getToken } from "./helper";

export async function getFeed() {
  const response = await fetch("/sweets/feed", {
    method: "get",
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}

export async function getUserSweets(uid) {
  const response = await fetch(`/sweets/${uid}`, {
    method: "get",
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}

export async function postNewSweet(new_sweet) {
  const response = await fetch(`/sweets/add/`, {
    method: "post",
    body: JSON.stringify(new_sweet),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}
