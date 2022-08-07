const express = require('express');

// All the functions in different controllers
const { codeGenerator, codeVerification } = require('../Controllers/MeetCode/meetCode');
const { registerUser, loginUser } = require('../Controllers/Authenticate/Authenticate');
const router = express.Router();

// Creating routes for router
// eg: router.get('/<Path>', <controller_func_name>)
router.get('/get-code', codeGenerator);
router.post('/verify-code', codeVerification);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
