const { getUser } = require("../service/auth")

function checkUrthorization(req, res, next) {
    const token = req.cookies.uid;

    if (!token) {
        return next();  // Allow access without redirecting
    }

    const user = getUser(token);
    if (!user) {
        res.clearCookie("uid"); // Remove invalid token
        return next(); // Allow unauthenticated users to proceed
    }

    req.user = user;
    next();
}

function restrictTO(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect("/login"); // Fix: Add "/" before login
        }
        if (!roles.includes(req.user.roles)) {
            return res.send("Unauthorized");
        }
        next(); // ✅ Now it properly proceeds to the next middleware
    };
}



module.exports = {
    checkUrthorization,
    restrictTO,
};