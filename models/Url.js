const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        unique: true,
        required: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visited: [{ timestamp: { type: Number } }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
}, { timestamps: true });

const URL = mongoose.model('url', urlSchema);

module.exports = URL;
