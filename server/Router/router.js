const express = require('express');

// All the functions in different controllers
const { codeGenerator } = require('../Controllers/MeetCode/meetCode');

var router = express.Router();

// Creating routes for router
// eg: router.get('/<Path>', <controller_func_name>)
router.get('/get-code', codeGenerator);

module.exports = router;
