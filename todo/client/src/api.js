export async function receiveTodos(cb) {
  const response = await fetch("/todo", { method: "get" });
  const todos = await response.json();
  cb(todos);
}

export async function addTodo(new_todo) {
  await fetch("/add", { method: "post", body: new_todo });
}

export async function toggleTodo(todo) {
  await fetch("/toggle", { method: "post", body: todo });
}
