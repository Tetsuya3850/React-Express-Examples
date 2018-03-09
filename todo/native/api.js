async function receiveTodos() {
  const response = await fetch("/todo", { method: "get" });
  return await response.json();
}

async function addNewTodo(new_todo) {
  await fetch("/add", {
    method: "post",
    body: JSON.stringify(new_todo),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

async function toggleTodo(_id) {
  await fetch("/toggle", {
    method: "post",
    body: JSON.stringify({ _id }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

async function deleteTodo(_id) {
  await fetch("/delete", {
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
