const express = require("express");
const { HandleGenerateUrl, HandleAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", HandleGenerateUrl);
router.get("/analytics/:shortID", HandleAnalytics);


module.exports = router;