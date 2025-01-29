const mongoose = require("mongoose");

async function mongoDB_connect() {
   return  mongoose.connect("mongodb://127.0.0.1:27017/Short-Url");
} 

module.exports = {
    mongoDB_connect,
}