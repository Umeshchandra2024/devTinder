const express = require("express");
const authRouter = express.Router();


const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");



authRouter.post("/signup", async (req,res) => {
    try{
    //validation of the data
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;
    // Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);


    //  creating a new instance of the User Model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
        await user.save();
        res.send("user added successfully");
    }
    catch(err) {
        res.status(400).send("ERROR :"+ err.message);
    }

    
});

authRouter.post("/login", async (req, res) => {
    try {
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user) {
        throw new Error("Invalid Credentials");
    }
    //now password
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid) {
        //create a JWT Token
        const token = await user.getJWT();
        // console.log(token);


        //Add the token to the cookie and send the response back to the user
        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: true });

        res.send("login Successfull...");
    }
    else{
        throw new Error("Invalid Credentials");
    }

    }
    catch(err) {
        res.status(400).send("ERROR :"+ err.message);
    }


});
authRouter.post("/logout", (req, res) => {
    //no need any auth because we are logging out
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout successfull!!!");
});


module.exports = authRouter;

