const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    next();
  } catch (error) {
    res.status(401).json({ error: error });
  }
}

module.exports = verifyToken;
