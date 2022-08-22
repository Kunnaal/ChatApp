const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/user.model');
require('dotenv').config({path:__dirname+'/../../../.env'});

module.exports.registerUser = async (req, res) => {
    try {
        const user_password = await bcrypt.hash(req.body.password, 10);
        await User.create({
            username: req.body.username,
            password: user_password,
            image_id: req.body.image_id,
        });
        res.json({status: "ok"});
    } catch (err) {
        res.json({status: 'error', error: "Duplicate Username."});
    }
}

module.exports.loginUser = async (req, res) => {

    // console.log(req.body);
    const db_user = await User.findOne({
        username: req.body.username,
    });

    if (!db_user) {
        return res.json({ status: "error", error: "No such user exists!" });
    }

    const user_authenticated = await bcrypt.compare(req.body.password, db_user.password);
    if (!user_authenticated) {
       return res.json({ status: 'error', error: 'Password incorrect!' });
    }

    console.log("Login successful...")

    const payload = {
        username: db_user.username,
        user_img_id: db_user.image_id,
        iat: Date.now(),
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ status: "ok", token: token });
}


module.exports.verifyUser = (req, res) => {
    const token = req.body.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({"payload": payload});
}
