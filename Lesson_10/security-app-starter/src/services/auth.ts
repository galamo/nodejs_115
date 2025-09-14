import api from "./api";

interface Creds {
  email: string;
  password: string;
}
const baseUrl = "http://localhost:3000";
export async function login({ email, password }: Creds) {
  // Example: POST /auth/login -> { token }
  const { data } = await api.post(baseUrl + "/auth/login", {
    userName: email,
    password,
  });
  if (!data?.token) throw new Error("No token returned");
  localStorage.setItem("token", data.token);
}

export async function register({ email, password }: Creds) {
  // Example: POST /auth/register
  const { data } = await api.post("/auth/register", { email, password });
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
