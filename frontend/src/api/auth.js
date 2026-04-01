import client from "./client";

export const loginUser = (email, password) =>
  client.post("/auth/login", { email, password });

export const registerUser = (name, email, password) =>
  client.post("/auth/register", { name, email, password });