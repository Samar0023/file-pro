import axios from "axios";

const api = axios.create({
  baseURL: "https://file-pro.onrender.com",
  withCredentials: true,
});

export default api;