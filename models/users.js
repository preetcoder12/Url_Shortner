const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    roles: {
        type: String,
        default: "NORMAL",
        required: true,
    },    
    password: {
        type: String,
        required: true,

    },

}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;