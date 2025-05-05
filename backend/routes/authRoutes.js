const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);  // Ensure signup is a function
router.post('/login', login);    // Ensure login is a function

module.exports = router;
