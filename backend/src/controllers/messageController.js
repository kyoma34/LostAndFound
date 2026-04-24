const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

async function sendMessage(req, res) {
  try {
    const { conversationId, text } = req.body;

    if (!conversationId || !text)
      return res.status(400).json({ message: "conversationId and text are required." });

    // Create the message
    const message = await Message.create({
      conversationId,
      sender: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
      },
      text,
    });

    // Update the conversation's lastMessage and updatedAt
    await Conversation.updateLastMessage(conversationId, text);

    // Populate sender info and return
    const populated = await Message.findById(message._id)
      .populate("sender.id", "name email avatar");

    return res.status(201).json(populated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

async function getMessages(req, res) {
  try {
    const { conversationId } = req.params;

    // Verify the conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation)
      return res.status(404).json({ message: "Conversation not found." });

    // Fetch messages
    const messages = await Message.findByConversationId(conversationId);
    return res.status(200).json(messages);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
}

module.exports = { sendMessage, getMessages };