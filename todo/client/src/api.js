async function receiveTodos() {
  const response = await fetch("/todo", { method: "get" });
  return await response.json();
}

async function addTodo(new_todo) {
  await fetch("/add", { method: "post", body: new_todo });
}

async function toggleTodo(todo) {
  await fetch("/toggle", { method: "post", body: todo });
}

const api = {
  receiveTodos,
  addTodo,
  toggleTodo
};
export default api;
