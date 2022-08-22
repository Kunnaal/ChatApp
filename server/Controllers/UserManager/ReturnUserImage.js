const jwt = require('jsonwebtoken');
require('dotenv').config({path:__dirname+'/../../../.env'});

module.exports.returnUserDP = async (req, res) => {
    const token = req.params.token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload) {
        return res.json({'user_image_id': payload.user_img_id});
    } else {
        res.json({status: 400});
    }
}
