const express = require('express');

const app = express();
// app.use((req,res) => {
//     res.send("Hello from devTinder server");
// });


app.use("/hello", (req,res) => {
    res.send("hello,hello from Tinder");
});

app.use("/test", (req,res) => {
    res.send("Hello from test");
});
app.use("/", (req,res) => {
    res.send("hello from dashboard");
}); 
app.listen(7777, () => {
    console.log("server is running on port 7777....");
});

