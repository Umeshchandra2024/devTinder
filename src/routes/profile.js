const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      data: user,
    });
  } catch (err) {
    console.error("[PROFILE] View error:", err.message);
    res.status(400).json({ message: err.message });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      return res.status(400).json({ message: "Invalid edit request" });
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    if (loggedInUser?.skills?.length > 10) {
      return res
        .status(400)
        .json({ message: "Skills length should be 10 or fewer" });
    }

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile was updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    console.error("[PROFILE] Edit error:", err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = profileRouter;