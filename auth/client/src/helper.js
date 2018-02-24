export function getToken() {
  return localStorage.getItem("jwt-token");
}

export function saveToken(token) {
  localStorage.setItem("jwt-token", token);
}
