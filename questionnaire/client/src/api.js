async function receiveResponses() {
  const response = await fetch("/response", { method: "get" });
  return await response.json();
}

async function addNewResponse(new_response) {
  const response = await fetch("/add", {
    method: "post",
    body: JSON.stringify(new_response),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return await response.json();
}

const api = {
  receiveResponses,
  addNewResponse
};
export default api;
