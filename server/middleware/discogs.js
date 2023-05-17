
const discogs = require("disconnect").Client;
const config = require("../config/dev");

module.exports = (req, res, next) => {
    try {
        req.client = new discogs({ userToken: config.discogs_token })
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).send("Failed to authenticate Discogs.");
    }
}
