
const express = require("express");
const URL = require('../models/Url');
const { restrictTO } = require("../middleware/auth");
const router = express.Router();

router.get("/", restrictTO(["NORMAL"]) , async (req, res) => {

    const userUrls = await URL.find({ createdBy: req.user._id });
    res.render("home", { urls: userUrls });

});

router.get('/signup', (req, res) => {
    return res.render("signup")
})
router.get('/login', (req, res) => {
    return res.render("login")
})


module.exports = router;