const jwt = require("jsonwebtoken");
const jwt_token = process.env.JWT_TOKEN;

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied.");

  if (req.path.includes("login") || req.path.includes("signup")) {
    next();
    return;
  }
  try {
    req.token = jwt.verify(token, jwt_token, {
      maxAge: "7d",
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Access denied. You must sign in");
  }
};
