const User = require('../models/users')

async function HandleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    // Create the new user in the database
    await User.create({
        name,
        email,
        password,
    });

    return res.redirect('/');  // Redirect to home page
}
async function HandleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Invalid username or password"
        })
    }

    return res.redirect('/');  // Redirect to home page
}


module.exports = {
    HandleUserSignUp,
    HandleUserLogin,
}