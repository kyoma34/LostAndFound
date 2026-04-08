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