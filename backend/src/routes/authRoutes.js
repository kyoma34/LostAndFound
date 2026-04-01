const express = require('express');
const { login } = require ("../controllers/authController.js")
const { register } = require ("../controllers/authController.js");
const rateLimiter = require('../middleware/rateLimiter.js');
const router = express.Router()

router.post("/login", rateLimiter, login);
router.post("/register",register)




module.exports = router;