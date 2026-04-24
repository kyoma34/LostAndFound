const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: String,
      email: String,
      avatar: String,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Statics for convenience
MessageSchema.statics.findByConversationId = async function(conversationId) {
  return this.find({ conversationId })
    .populate("sender.id", "name email avatar")
    .sort({ createdAt: 1 }); // oldest first
};

module.exports = mongoose.model("Message", MessageSchema);