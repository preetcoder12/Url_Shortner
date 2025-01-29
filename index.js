const express = require("express");
const URLroute = require('./Routes/url');
const { mongoDB_connect } = require("./connect");
const URL = require('./models/Url');
const path = require("path")
const staticRoute = require("./Routes/staticRoutes")

const port = 8001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs") //hmara view engine ejs hai 
app.set("views", path.resolve("./views"))// hmari sari ejs related file yha pdi hai


mongoDB_connect().then(() => console.log("MongoDB connected successfully"));


app.use('/url', URLroute);
app.use('/', staticRoute);

//this helps to visited the real link with short link
app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortID }, // Find by shortID
            { $push: { visited: { timestamp: Date.now() } } }, // Push the timestamp into visited array
            { new: true } // Return the updated document
        );

        // If entry not found, respond with a 404 error
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Redirect to the original URL
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error("Error in redirect:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server running at port ${port} 🚀`);
});
