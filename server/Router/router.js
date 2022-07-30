const express = require('express');

// All the functions in different controllers
const { codeGenerator, codeVerification } = require('../Controllers/MeetCode/meetCode');

const router = express.Router();

// Creating routes for router
// eg: router.get('/<Path>', <controller_func_name>)
router.get('/get-code', codeGenerator);
router.post('/verify-code', codeVerification);


module.exports = router;
