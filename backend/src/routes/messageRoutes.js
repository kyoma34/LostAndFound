const express     = require("express");
const router      = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const requireAuth = require("../middleware/authMiddleware");

router.post("/",                    requireAuth, sendMessage);
router.get("/:conversationId",      requireAuth, getMessages);

module.exports = router;