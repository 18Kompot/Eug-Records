const discogs = require("disconnect").Client;
const discogs_token = process.env.DISCOGS_TOKEN;

module.exports = (req, res, next) => {
  try {
    req.client = new discogs({ userToken: discogs_token });
    next();
  } catch (err) {
    res.status(401).send("Failed to authenticate Discogs.");
  }
};
