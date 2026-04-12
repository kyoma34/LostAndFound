const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true
    },

    location: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["unclaimed", "claimed"],
      default: "unclaimed",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Post", PostSchema);