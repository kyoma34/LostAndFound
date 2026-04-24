const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    lastMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Statics for convenience
ConversationSchema.statics.findExisting = async function(user1Id, user2Id) {
  return this.findOne({
    $or: [
      { "members.user1": user1Id, "members.user2": user2Id },
      { "members.user1": user2Id, "members.user2": user1Id },
    ],
  });
};

ConversationSchema.statics.findByUserId = async function(userId) {
  return this.find({
    $or: [
      { "members.user1": userId },
      { "members.user2": userId },
    ],
  })
    .populate("members.user1", "name email avatar")
    .populate("members.user2", "name email avatar")
    .sort({ updatedAt: -1 });
};

ConversationSchema.statics.updateLastMessage = async function(id, text) {
  return this.findByIdAndUpdate(
    id,
    { lastMessage: text },
    { new: true }
  );
};

module.exports = mongoose.model("Conversation", ConversationSchema);