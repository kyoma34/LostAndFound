
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

// Fake in-memory posts store (same pattern as User.js)
const POSTS = [];

async function findAll() {
  // Sort by createdAt descending — newest first
  return [...POSTS].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function findById(id) {
  return POSTS.find((p) => p._id === id) || null;
}

async function create({ title, desc, type, date, location, image, createdBy }) {
  const newPost = {
    _id:       String(POSTS.length + 1),
    title,
    desc,
    type,
    date,
    location,
    image:     image || null,
    status:    "unclaimed",       // always unclaimed on creation, per the doc
    createdBy,                    // user id + name + email from the token
    createdAt: new Date().toISOString(),
  };

  POSTS.push(newPost);
  return newPost;
}

module.exports = { findAll, findById, create };