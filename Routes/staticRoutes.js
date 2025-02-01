
const express = require("express");
const URL = require('../models/Url');
const router = express.Router();
router.get("/", async (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }

    try {
        // ✅ Fetch only the URLs created by the logged-in user
        const userUrls = await URL.find({ createdBy: req.user._id });

        res.render("home", { urls: userUrls });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Internal Server Error");
    }
});



router.get('/signup', (req, res) => {
    return res.render("signup")
})
router.get('/login', (req, res) => {
    return res.render("login")
})


module.exports = router;