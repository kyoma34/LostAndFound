import client from "./client";

// Create a new conversation with a user
export const createConversation = (receiverId) =>
  client.post("/conversations", { receiverId });

// Get all conversations for the current user
export const getConversations = () =>
  client.get("/conversations");

// Get a single conversation by ID
export const getConversationById = (conversationId) =>
  client.get(`/conversations/${conversationId}`);
