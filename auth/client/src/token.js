function saveToken(token) {
  localStorage.setItem("my-token", token);
  this.token = token;
}

function logout() {
  this.token = "";
  window.localStorage.removeItem("my-token");
}
