const shortid = require('shortid');
const URL = require('../models/Url');

async function HandleGenerateUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    const shortID = shortid.generate();

    // Save new URL assigned to the logged-in user
    await URL.create({
        shortID,
        redirectURL: body.url,
        visited: [],
        createdBy: req.user._id,  // Associate URL with the user
    });

    // Fetch only the logged-in user's URLs
    const userUrls = await URL.find({ createdBy: req.user._id });

    // Pass the 'id' to the view when rendering
    return res.render("home", {
        id: shortID, // Pass the short ID
        urls: userUrls,  // Only return URLs created by this user
    });
}



async function HandleAnalytics(req, res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortID });
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;//for ip address
    return res.json({ totalclicks: result.visited.length, analytics: result.visited, IPaddress: userIP })

}

module.exports = {
    HandleGenerateUrl,
    HandleAnalytics,
};