const Conversation = require("../models/Conversation");
const User = require("../models/User");

async function createConversation(req, res) {
  try {
    const { receiverId } = req.body;

    if (!receiverId)
      return res.status(400).json({ message: "receiverId is required." });

    const senderId = req.user.id;

    // Check if conversation already exists between these two users
    const existing = await Conversation.findExisting(senderId, receiverId);

    if (existing) {
      // Populate the conversation with user data and return
      const populated = await Conversation.findById(existing._id)
        .populate("members.user1", "name email avatar")
        .populate("members.user2", "name email avatar");
      return res.status(200).json(enrichConversation(populated, senderId));
    }

    // Create new conversation
    const conversation = await Conversation.create({
      members: {
        user1: senderId,
        user2: receiverId,
      },
    });

    // Populate and return
    const populated = await Conversation.findById(conversation._id)
      .populate("members.user1", "name email avatar")
      .populate("members.user2", "name email avatar");

    return res.status(201).json(enrichConversation(populated, senderId));

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

async function getConversations(req, res) {
  try {
    const conversations = await Conversation.findByUserId(req.user.id);
    
    // Enrich conversations with "otherUser" field for easier frontend handling
    const enriched = conversations.map((conv) => enrichConversation(conv, req.user.id));
    
    return res.status(200).json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

// Helper to determine the "other user" for easier frontend consumption
function enrichConversation(conversation, currentUserId) {
  const user1Id = conversation.members.user1._id.toString();
  const user2Id = conversation.members.user2._id.toString();
  const currentId = currentUserId.toString();

  const otherUser = currentId === user1Id ? conversation.members.user2 : conversation.members.user1;

  return {
    _id: conversation._id,
    members: conversation.members,
    lastMessage: conversation.lastMessage,
    otherUser: {
      _id: otherUser._id,
      name: otherUser.name,
      email: otherUser.email,
      avatar: otherUser.avatar,
    },
    updatedAt: conversation.updatedAt,
    createdAt: conversation.createdAt,
  };
}

module.exports = { createConversation, getConversations };