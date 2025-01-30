const { getUser } = require("../service/auth")


async function restrictLoggingUser(req, res, next) {
    const useruid = req.cookies.uid;

    if (!useruid) { return res.redirect("/login") };

    const user = getUser(useruid);
    if (!user) { return res.redirect("/login") };

    req.user = user;
    next();
}
async function checkAuth(req, res, next) {
    const useruid = req.cookies.uid;
    if (!useruid) {
        req.user = null;
        return next();
    }

    const user = getUser(useruid);
    if (!user) {
        req.user = null;
        return next();
    }

    req.user = user;
    next();
}


module.exports = {
    restrictLoggingUser,
    checkAuth,
}