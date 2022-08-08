const bcrypt = require("bcryptjs")
const { User } = require("../Models/user.model");

module.exports.registerUser = async (req, res) => {
    console.log(req.body);
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

    console.log(req.body);

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
    console.log("Create a JWT")
    return res.json({ status: "ok" });
}
