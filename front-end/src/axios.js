// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTION_BACKEND_URL,
  withCredentials: true, // 👈 this sends cookies/session data!
});

export default instance;
