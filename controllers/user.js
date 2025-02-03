const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { setUser } = require('../service/auth');
const User = require('../models/users');

// In HandleUserSignUp function
async function HandleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        console.log("missing required fields");
        return res.render("signup", { error: "All fields are required" }); // Pass error here
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("Email already in use");

        // Pass the error to the signup page
        return res.render("signup", { error: "User exists with the same email" });
    }

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
        return res.render("login", { error: "Invalid username or password" });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render("login", { error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = setUser(user._id, user);

    // Store JWT in cookies
    res.cookie("uid", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour expiration
    });

    console.log("Login successful, redirecting to home...");
    return res.redirect('/');
}



module.exports = {
    HandleUserSignUp,
    HandleUserLogin,
};