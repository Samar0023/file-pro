import api from "./axios";

export interface LoginData {
  username: string;
  email: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const login = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const profile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};