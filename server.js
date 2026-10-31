const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
    console.log("Waste to Wonder is running!");
    console.log("Open http://localhost:3000");
});