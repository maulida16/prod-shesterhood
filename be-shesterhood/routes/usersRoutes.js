const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

// Endpoint untuk login
router.post('/login', userControllers.login);

module.exports = router;
