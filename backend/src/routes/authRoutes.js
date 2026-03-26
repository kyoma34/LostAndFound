const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const { protect } = require('../middleware/authmiddleware');

// Routes publiques
router.post('/register', register);


// Routes protégées


module.exports = router;