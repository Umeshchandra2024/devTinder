const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        //Read the token from the req cookies
        
        const {token} = req.cookies;
        if(!token) {
            throw new Error("Token is not Valid !!!");
        }

        const decodedObj = await jwt.verify(token, "Umdestroy@11");

        const { _id } = decodedObj;
        const user = await User.findById(_id);

        if(!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }

    // Find the user
};
// The below is the exports
module.exports = {
    userAuth,
};