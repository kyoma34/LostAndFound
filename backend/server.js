const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const { connectDB } = require("./src/config/db.js");

const authRoutes = require("./src/routes/authRoutes");
const postRoutes = require("./src/routes/postRoutes");

const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes      = require("./routes/messageRoutes");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Start server only after DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
});


app.use("/api/conversations", conversationRoutes);
app.use("/api/messages",      messageRoutes);