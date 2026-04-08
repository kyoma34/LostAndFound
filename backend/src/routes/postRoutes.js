const express    = require("express");
const router     = express.Router();
const { createPost, getAllPosts, getPostById } = require("../controllers/postController");
const requireAuth = require("../middleware/authMiddleware");
const upload      = require("../middleware/upload");

router.post("/",    requireAuth, upload.single("image"), createPost); // protected
router.get("/",     getAllPosts);                                      // public
router.get("/:id",  getPostById);                                     // public

module.exports = router;