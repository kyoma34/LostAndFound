const Conversation = require("../models/Conversation");

async function createConversation(req, res) {
  try {
    const { receiverId } = req.body;

    if (!receiverId)
      return res.status(400).json({ message: "receiverId is required." });

    const senderId = req.user.id;

    // Check if conversation already exists between these two users
    const existing = await Conversation.findExisting(senderId, receiverId);

    if (existing)
      return res.status(200).json(existing); // return existing, don't create a new one

    const conversation = await Conversation.create(senderId, receiverId);
    return res.status(201).json(conversation);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

async function getConversations(req, res) {
  try {
    const conversations = await Conversation.findByUserId(req.user.id);
    return res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

module.exports = { createConversation, getConversations };