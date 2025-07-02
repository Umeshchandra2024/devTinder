const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA =  "firstName lastName photoUrl age gender about";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {   
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",       
        }).populate("fromUserId", USER_SAFE_DATA);
        // populate("fromUserId", ["firstName", "lastName"])

        res.json({message : "Data fetched successfully",
            data: connectionRequest
        });
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const data = await connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data});


    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        //pagenation
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 4 ? 4 : limit;
        const skip = ( page - 1 ) * limit;
        // User should see all the users cards except
        // 0. his own card
        // 1. his connections
        // 2. ignored people
        // 3. already sent the connection request

        // Example: Rahul =[Mark, Donald, Ms dhoni, virat]
        // R->umesh->rejected    R->Elon->accepted

        // find all connection requests (sent + received)
        const connectionRequest = await ConnectionRequest.find({
            $or: [ { fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        // console.log(hideUsersFromFeed);

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);

        

    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = userRouter;