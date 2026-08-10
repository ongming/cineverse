import { users } from "../data/users.js";

export function login(email, password) {
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    return user;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("user");
}
