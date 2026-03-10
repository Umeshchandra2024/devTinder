const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("[AUTH] JWT_SECRET is not set");
      return res
        .status(500)
        .json({ message: "Server configuration error: JWT secret missing" });
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

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