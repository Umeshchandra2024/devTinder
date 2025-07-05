const express = require('express');

const app = express();
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//here we use the middleware which is monster
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

//routes middlewares
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);







//Feed API Which is GET
// the below is the findById model api
// app.get("/feed", async (req, res) => {
//     const userId = req.body._id;
//     try{
//         const users = await User.findById({_id: userId});
//         res.send(users);
//     }
//     catch(err){
//         res.status(400).send("something went wrong");
//     }
// });

// app.delete("/userDel", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const users = await User.findByIdAndDelete({_id: userId});

//         res.send("user deleted successfully");

//     }catch(err) {
//         res.status(400).send("Something went Wrong");
//     }
// });

// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;

//     try{
//         const ALLOWED_UPDATES = [
//             "photoUrl",
//             "about",
//             "gender",
//             "age",
//             "skills",
//         ];
//         const isUpdateAllowed = Object.keys(data).every((k) => 
//             ALLOWED_UPDATES.includes(k)
//         );
//         if(!isUpdateAllowed){
//             throw new Error("Update not Allowed");
//         }
//         if(data?.skills.length > 10){
//             throw new Error("skills cannot be more than 10");
//         }
//         const users = await User.findByIdAndUpdate({_id: userId}, data, {
//             returnDocument: "after",
//             runValidators: true,
//         });
//         // console.log(users);

//         res.send("user Updated successfully");


//     }catch(err){
//         res.status(400).send("UPDATE FAILED:" + err.message);
//     }


// })

// app.get("/user", async (req, res) => {
//     const email = req.body.emailId;
//     try{

//         const user = await User.findOne({emailId: email});
        
//         if(!user){
//             res.status(404).send("user not found");
//         }
//         else{
//             res.send(user);
//         }
//         // if(user.length === 0){
//         //     res.status(404).send("user not found");
//         // }
//         // else{
//         //     res.send(user);
//         // }
        
//     }
//     catch(err){
//         res.status(400).send("something went wrong");
//     }
// });
// app.use((req,res) => {
//     res.send("Hello from devTinder server");
// });

// app.use("/user", (req,res) => {
//     res.send("HAHAHAHAHA");
// });

// app.get("/user/:userid/:password", (req,res) => {
//     console.log(req.params);
//     res.send({firstName: "Umesh", lastName: "Chandra"});
// });

// app.get("/ab+c", (req,res) => {
//     res.send("hHAAHAHAHHA");
// });

// app.use("/getUserData", (req, res) => {


//     throw new Error("dj");
//     res.send("user Data sent");
    
// });

// app.use("/", (err, req, res, next) => {
//     if(err){
//         res.status(500).send("something went wrong");
//     }
// });
// app.use("/admin", adminAuth);

// app.get("/user", userAuth, (req, res) => {
//     res.send("user is authorized");
// });

// app.get("/admin/getAllData", (req, res) => {
//     //logic of checking if the request is authorized
//    res.send("All data sent");
    
// });

// app.get("/admin/deleteUser", (req, res) => {
//     res.send("Deleted a user");
// });

// app.use("/user", (req, res, next) => {
//     console.log("response1");
//     res.send("Route Handler1");
//     // next();
// });
// app.get("/usr", (req, res, next) => {
//     console.log("response2");
//     // res.send("Route Handler2");
//     next();
// },
// (req, res) => {
//     res.send("Route Handler3");
// });

// app.use("/user", (req, res, next) => {
//     //route handler
//     console.log("check point");
//     next();
//     // res.send("Route Handler1");
    
    

// },
// (req, res, next) => {
//     console.log("2nd check point");
//     // res.send("Route Handler 2");
//     next();
// },
// (req, res) => {
//     console.log("3rd check point");
//     res.send("Route handler 3");
// });



// app.post("/user", (req,res) => {
//     res.send("Data successfully to the dashboard");
// });

// app.delete("/user", (req,res) => {
//     res.send("Deleted Successfully");
// });

// app.use("/hello", (req,res) => {
//     res.send("hello,hello from Tinder");
// });

// app.use("/test", (req,res) => {
//     res.send("Hello from test");
// });
// app.use("/", (req,res) => {
//     res.send("hello from dashboard");
// }); 

connectDB().then(() => {
    console.log("Database connection is established...");
    app.listen(7777, () => {
    console.log("server is running on port 7777....");
});
})
.catch((err) => {
    console.log("Database is not  connected!!");
});


