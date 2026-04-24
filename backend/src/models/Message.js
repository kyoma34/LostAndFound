const MESSAGES = [];

async function findByConversationId(conversationId) {
  return [...MESSAGES]
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // oldest first
}

async function create({ conversationId, sender, text }) {
  const newMessage = {
    _id:            String(MESSAGES.length + 1),
    conversationId,
    sender,         // { id, name, email } from token
    text,
    createdAt:      new Date().toISOString(),
  };

  MESSAGES.push(newMessage);
  return newMessage;
}

module.exports = { findByConversationId, create };