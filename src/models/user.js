const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength:50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid email Address: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password: " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 50,
    },
    gender: {
        type: String,
        //custom validators
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "http://umesh.jpg",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo url: " + value);
            }
        }
    },
    about: {
        type: String,
        default: "This is the default of the about user",
        validate(value) {
            if(!validator.isLength(value, {min: 10, max: 200})) {
                throw new Error("LEN should be 10 to 200: " + value);
            }
        }
    },
    skills: {
        type: [String],
    },

}, 
{
    timestamps: true,
});

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "Umdestroy@11", {expiresIn: "1d"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);

