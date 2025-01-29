const shortid = require('shortid');
const URL = require('../models/Url');

async function HandleGenerateUrl(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(404).json({ error: "invalid Url" });
    }
    const shortID = shortid.generate();
    const allurls = await URL.find({});

    const newUrl = await URL.create({
        shortID,
        redirectURL: body.url,
        visited: []
    })
    return res.render("home", {
        id: shortID,
        urls: allurls,

    })
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
