const jwt = require('jsonwebtoken');
require('dotenv').config({path:__dirname+'/../../../.env'});

module.exports.returnUserName = async (req, res) => {
    const token = req.params.token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload) {
        return res.json({'username': payload.username});
    } else {
        res.json({status: 400});
    }
}
