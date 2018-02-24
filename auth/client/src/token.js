function saveToken(token) {
  localStorage.setItem("my-token", token);
  this.token = token;
}

function getToken() {
  if (!this.token) {
    this.token = localStorage.getItem("my-token");
  }
  return this.token;
}

function logout() {
  this.token = "";
  window.localStorage.removeItem("my-token");
}

function getUserDetails() {
  const token = this.getToken();
  let payload;
  if (token) {
    payload = token.split(".")[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  } else {
    return null;
  }
}

function isLoggedIn() {
  const user = this.getUserDetails();
  if (user) {
    return user.exp > Date.now() / 1000;
  } else {
    return false;
  }
}

{
  headers: {
    Authorization: `Bearer ${this.getToken()}`;
  }
}

if (data.token) {
  this.saveToken(data.token);
}
