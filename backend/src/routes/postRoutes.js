const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

// CREATE (protected)
router.post("/", requireAuth, upload.single("image"), createPost);

// READ
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// UPDATE (protected)
router.put("/:id", requireAuth, upload.single("image"), updatePost);

// DELETE (protected)
router.delete("/:id", requireAuth, deletePost);

module.exports = router;