const bcrypt = require("bcryptjs");

const USERS = [
  {
    _id: "1",
    name: "Admin User",
    email: "admin@mail.com",
    password: bcrypt.hashSync("password123", 12),
    role: "admin",
  },
  {
    _id: "2",
    name: "John Doe",
    email: "john@mail.com",
    password: bcrypt.hashSync("mySecret!", 12),
    role: "user",
  },
];

async function findOne({ email }) {
  const user = USERS.find((u) => u.email === email) || null;
  if (!user) return null;

  user.comparePassword = async (plainText) => bcrypt.compare(plainText, user.password);
  return user;
}

async function create({ name, email, password }) {
  const existing = USERS.find((u) => u.email === email);
  if (existing) throw new Error("User already exists");

  const newUser = {
    _id: String(USERS.length + 1),
    name,
    email,
    password: await bcrypt.hash(password, 12),
    role: "user", // role is never set during register, per the doc
  };

  USERS.push(newUser);
  return newUser;
}

module.exports = { findOne, create };