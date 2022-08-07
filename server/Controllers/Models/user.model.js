const mongoose = require('mongoose');
const {Model} = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    image_id: {
        type: Number,
        required: true,
    }
}, { collection: 'Userbase' });

module.exports.User = mongoose.model(name="Userbase", schema=userSchema);
