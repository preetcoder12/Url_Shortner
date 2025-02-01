const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { setUser } = require('../service/auth');
const User = require('../models/users');

async function HandleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database with hashed password
    await User.create({ name, email, password: hashedPassword });

    // Redirect to login page after successful sign-up
    return res.redirect('/login');
}
async function HandleUserLogin(req, res) {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.render("login", {
            error: "Invalid username or password",
        });
    }

    // Compare entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render("login", {
            error: "Invalid username or password",
        });
    }

    // Create a unique session ID for the user (ensure it's unique per user session)
    const sessionID = uuidv4();

    // Save session ID and user to the session storage
    setUser(sessionID, user);

    // Set the cookie with the session ID (uid)
    res.cookie("uid", sessionID, {
        httpOnly: true,  // Make the cookie inaccessible from JavaScript for security
        secure: process.env.NODE_ENV === 'production',  // Secure cookie only in production (HTTPS)
        maxAge: 3600000,  // Cookie expiration time (1 hour)
    });

    // Redirect to home page after successful login
    return res.redirect('/'); // This ensures that after login, the user is redirected to the home page
}


module.exports = {
    HandleUserSignUp,
    HandleUserLogin,
};