const express = require('express');

// All the functions in different controllers
const { codeGenerator, codeVerification } = require('../Controllers/MeetCode/meetCode');
const { registerUser, loginUser, verifyUser } = require('../Controllers/Authenticate/Authenticate');
const { returnUserDP } = require('../Controllers/UserManager/ReturnUserImage');
const {returnUserName} = require("../Controllers/UserManager/ReturnUserName");
const router = express.Router();

// Creating routes for router
// eg: router.get('/<Path>', <controller_func_name>)
router.get('/get-code', codeGenerator);
router.post('/verify-code', codeVerification);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/login/verify', verifyUser);
router.get('/getDp/:token', returnUserDP);
router.get('/getUsername/:token', returnUserName);

module.exports = router;
