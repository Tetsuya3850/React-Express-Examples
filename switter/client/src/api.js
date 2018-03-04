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

export async function getUser(uid) {
  const response = await fetch(`/users/${uid}`, {
    method: "get",
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}

export async function getUserSweets(uid) {
  const response = await fetch(`/sweets/users/${uid}`, {
    method: "get",
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}

export async function getSweet(sweetId) {
  const response = await fetch(`/sweets/comments/${sweetId}`, {
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

export async function postToggleSweet(sweetId) {
  const response = await fetch(`/sweets/togglelike/`, {
    method: "post",
    body: JSON.stringify({ sweetId }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}

export async function postComment(payload) {
  const response = await fetch(`/sweets/comment/`, {
    method: "post",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`
    }
  });
  return await response.json();
}
