const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName ){
        throw new Error("Name is not Valid");
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Email is not Valid");
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Please enter a Strong Password");
    }

};

const validateEditProfile = (req) => {
    try{
        const allowedEditFields = [
            "firstName",
            "lastName", 
            "emailId", 
            "about", 
            "age", 
            "gender", 
            "skills", 
            "photoUrl"
        ];
        

        const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
        return isEditAllowed;
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = {
    validateSignUpData,
    validateEditProfile,
}