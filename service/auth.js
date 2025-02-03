const jwt = require("jsonwebtoken")
const secret = "Preet@12345";
// const sessionIDmap = new Map();

function setUser(id, user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        roles: user.roles // Fix here
    }, secret);

}

function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;

    }
}

module.exports = {
    setUser,
    getUser,
};