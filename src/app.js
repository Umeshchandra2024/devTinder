const express = require('express');

const app = express();
// app.use((req,res) => {
//     res.send("Hello from devTinder server");
// });

// app.use("/user", (req,res) => {
//     res.send("HAHAHAHAHA");
// });

app.get("/user", (req,res) => {
    res.send({firstName: "Umesh", lastName: "Chandra"});
});

app.post("/user", (req,res) => {
    res.send("Data successfully to the dashboard");
});

app.delete("/user", (req,res) => {
    res.send("Deleted Successfully");
});

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

