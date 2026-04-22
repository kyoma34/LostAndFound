const CONVERSATIONS = [];

async function findExisting(user1Id, user2Id) {
  return CONVERSATIONS.find(
    (c) =>
      (c.members.user1 === user1Id && c.members.user2 === user2Id) ||
      (c.members.user1 === user2Id && c.members.user2 === user1Id)
  ) || null;
}

async function findByUserId(userId) {
  return [...CONVERSATIONS]
    .filter((c) => c.members.user1 === userId || c.members.user2 === userId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

async function findById(id) {
  return CONVERSATIONS.find((c) => c._id === id) || null;
}

async function create(user1Id, user2Id) {
  const newConversation = {
    _id:         String(CONVERSATIONS.length + 1),
    members:     { user1: user1Id, user2: user2Id },
    lastMessage: null,
    updatedAt:   new Date().toISOString(),
  };

  CONVERSATIONS.push(newConversation);
  return newConversation;
}

async function updateLastMessage(id, text) {
  const conversation = CONVERSATIONS.find((c) => c._id === id);
  if (!conversation) return null;

  conversation.lastMessage = text;
  conversation.updatedAt   = new Date().toISOString();
  return conversation;
}

module.exports = { findExisting, findByUserId, findById, create, updateLastMessage };