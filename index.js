const express = require("express");
const URLroute = require('./Routes/url');
const { mongoDB_connect } = require("./connect");
const URL = require('./models/Url');
const path = require("path");
const staticRoute = require("./Routes/staticRoutes");
const userRoute = require("./Routes/user");
const cookieParser = require("cookie-parser");
const { restrictLoggingUser,checkAuth } = require("./middleware/auth")

const port = 8001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs") //hmara view engine ejs hai 
app.set("views", path.resolve("./views"))// hmari sari ejs related file yha pdi hai


mongoDB_connect().then(() => console.log("MongoDB connected successfully"));


app.use('/url', restrictLoggingUser, URLroute);
app.use('/user', userRoute);
app.use('/',checkAuth, staticRoute);

//this helps to visited the real link with short link
app.get('/:shortID', async (req, res) => {

    const shortID = req.params.shortID;

    const entry = await URL.findOneAndUpdate(
        { shortID }, // Find by shortID
        { $push: { visited: { timestamp: Date.now() } } }, // Push the timestamp into visited array
        { new: true } // Return the updated document
    );
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL);

});

app.listen(port, () => {
    console.log(`Server running at port ${port} 🚀`);
});
