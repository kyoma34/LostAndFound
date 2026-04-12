import client from "./client";

export const createPost = (formData) =>
  client.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getPosts = () => client.get("/posts");

export const getPostById = (id) => client.get(`/posts/${id}`);