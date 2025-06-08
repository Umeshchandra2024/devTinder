const express = require('express');

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth")
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
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
    res.send("user is authorized");
});

app.get("/admin/getAllData", (req, res) => {
    //logic of checking if the request is authorized
   res.send("All data sent");
    
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
});

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
app.listen(7777, () => {
    console.log("server is running on port 7777....");
});

