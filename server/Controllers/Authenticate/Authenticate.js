const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/user.model');
require('dotenv').config({path:__dirname+'/../../../.env'});

module.exports.registerUser = async (req, res) => {
    // console.log(req.body);
    try {
        const user_password = await bcrypt.hash(req.body.password, 10);
        await User.create({
            username: req.body.username,
            password: user_password,
            image_id: req.body.image_id,
        });
        res.json({status: "ok"});
    } catch (err) {
        console.log("User auth error @ Register: "+err);
        res.json({status: 'error', error: "Duplicate Username."});
    }
}

module.exports.loginUser = async (req, res) => {

    // console.log(req.body);
    const db_user = await User.findOne({
        username: req.body.username,
    });

    if (!db_user) {
        console.log("Inside invalid user");
        return res.json({ status: "error", error: "No such user exists!" });
    }

    const user_authenticated = await bcrypt.compare(req.body.password, db_user.password);
    if (!user_authenticated) {
        console.log("Inside invalid password");
       return res.json({ status: 'error', error: 'Password incorrect!' });
    }

    console.log("Login successful...")

    const payload = {
        username: db_user.username,
        iat: Date.now(),
    }
    // console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    // console.log(token);

    return res.json({ status: "ok", token: token });
}


module.exports.verifyUser = (req, res) => {
    const token = req.body.token;
    console.log(token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    return res.json({"payload": payload});
}
