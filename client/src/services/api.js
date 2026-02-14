import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

async function safe(promise, fallback) {
  try {
    const res = await promise;
    return res.data;
  } catch {
    return fallback;
  }
}

export const extract = text =>
  safe(API.post("/extract", { text }), null);

export const getActions = () =>
  safe(API.get("/actions"), []);

export const getHistory = () =>
  safe(API.get("/history"), []);

export const getStatus = () =>
  safe(API.get("/status"), {
    backend: false,
    database: false,
    llm: false,
  });

export const createAction = data =>
  safe(API.post("/actions", data), null);

export const updateAction = (id, data) =>
  safe(API.put(`/actions/${id}`, data), null);

export const deleteAction = id =>
  safe(API.delete(`/actions/${id}`), null);
