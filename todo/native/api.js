async function fetchTodos() {
  const response = await fetch("http://10.0.1.6:5150/todo", {
    method: "get"
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Something went wrong! Please Refresh!");
}

async function addNewTodo(new_todo) {
  const response = await fetch("http://10.0.1.6:5150/add", {
    method: "post",
    body: JSON.stringify(new_todo),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Saving failed! Please try again!");
  }
}

async function toggleTodo(_id) {
  const response = await fetch("http://10.0.1.6:5150/toggle", {
    method: "post",
    body: JSON.stringify({ _id }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Toggling failed! Please try again!");
  }
}

async function deleteTodo(_id) {
  const response = await fetch("http://10.0.1.6:5150/delete", {
    method: "post",
    body: JSON.stringify({ _id }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Delete failed! Please try again!");
  }
}

const api = {
  fetchTodos,
  addNewTodo,
  toggleTodo,
  deleteTodo
};
export default api;
