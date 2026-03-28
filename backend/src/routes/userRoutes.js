const express     = require("express");
const router      = express.Router();
const { login } = require("../controllers/userController");
const loginLimiter = require("../middleware/loginLimiter");
const requireAuth  = require("../middleware/requireAuth");

router.post("/login",    loginLimiter, login);

// Example protected route — req.user is available here
router.get("/me", requireAuth, (req, res) => {
  res.json({ message: "Protected route accessed.", userId: req.user.id });
});

module.exports = router;