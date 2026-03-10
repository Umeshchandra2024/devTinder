const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const decodedObj = await jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret"
    );

    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({ message: "User not found for token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("[AUTH] Authentication failed:", err.message);
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = {
  userAuth,
};