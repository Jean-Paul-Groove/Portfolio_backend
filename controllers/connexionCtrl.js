const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const password = req.body.password;
  if (password === process.env.ACCESS_PASSWORD) {
    const token = jwt.sign(
      { message: "Connexion réussie" },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );
    res.status(200).json({ message: "Connexion réussie", token: token });
  } else {
    console.log(req.body);
    res.status(401).json({ message: "Thou Shall Not pass !" });
  }
};

exports.confirmToken = (req, res, next) => {
  try {
    res.status(200).json({ tokenValidity: true });
  } catch (error) {
    res.status(500).json({ error });
  }
};
