const User = require('../models/users')

async function HandleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    // Create the new user in the database
    await User.create({
        name,
        email,
        password,
    });

    // After signup, redirect to the homepage
    return res.render('home');  // Redirect to home page
}


module.exports = {
    HandleUserSignUp,
}