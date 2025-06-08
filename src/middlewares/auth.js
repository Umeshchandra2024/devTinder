const adminAuth = (req, res, next) => {
    console.log("admin is authorized");
    const token = "umesh";
    const isAuthorized = token === "umesh";
    if(!isAuthorized){
        res.status(401).send("unauthorized");
    }
    else{
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("admin is authorized");
    const token = "umesh";
    const isAuthorized = token === "umesh";
    if(!isAuthorized){
        res.status(401).send("unauthorized");
    }
    else{
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth,
};