import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getSnippets = () => API.get("/");
export const createSnippet = (data) => API.post("/", data);
export const updateSnippet = (id, data) => API.put(`/${id}`, data);
export const deleteSnippet = (id) => API.delete(`/${id}`);