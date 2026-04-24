const express      = require("express");
const router       = express.Router();
const { createConversation, getConversations } = require("../controllers/conversationController");
const requireAuth  = require("../middleware/authMiddleware");

router.post("/", requireAuth, createConversation);
router.get("/",  requireAuth, getConversations);

module.exports = router;