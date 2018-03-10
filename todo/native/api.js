async function receiveTodos() {
  const response = await fetch("http://10.0.1.6:5150/todo", { method: "get" });
  return await response.json();
}

async function addNewTodo(new_todo) {
  await fetch("http://10.0.1.6:5150/add", {
    method: "post",
    body: JSON.stringify(new_todo),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

async function toggleTodo(_id) {
  await fetch("http://10.0.1.6:5150/toggle", {
    method: "post",
    body: JSON.stringify({ _id }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

async function deleteTodo(_id) {
  await fetch("http://10.0.1.6:5150/delete", {
    method: "post",
    body: JSON.stringify({ _id }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

const api = {
  receiveTodos,
  addNewTodo,
  toggleTodo,
  deleteTodo
};
export default api;
