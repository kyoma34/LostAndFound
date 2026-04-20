// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Chaîne : verifyToken → adminMiddleware → handler
router.get('/', verifyToken, adminMiddleware, getAllUsers);
router.delete('/:id', verifyToken, adminMiddleware, deleteUser);

module.exports = router;