import { getToken } from "./helper";

export async function postNewSweet(new_sweet) {
  const response = await fetch("/sweet/add", {
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
