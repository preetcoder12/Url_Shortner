const express = require("express");
const { HandleUserSignUp } = require("../controllers/user");

const router = express.Router();

router.post('/', HandleUserSignUp);


module.exports = router;


