import { getToken } from "./helper";

export async function getFeed() {
  const response = await fetch("/sweet/feed", {
    method: "get",
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}

export async function getOwnSweets(uid) {
  const response = await fetch(`/users/${uid}`, {
    method: "get",
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}

export async function postNewSweet(new_sweet, uid) {
  console.log(uid);
  const response = await fetch(`/users/add/${uid}`, {
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
