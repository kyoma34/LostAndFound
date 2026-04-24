import client from "./client";

// Send a message in a conversation
export const sendMessage = (conversationId, text) =>
  client.post("/messages", { conversationId, text });

// Get all messages in a conversation
export const getMessages = (conversationId) =>
  client.get(`/messages/${conversationId}`);
