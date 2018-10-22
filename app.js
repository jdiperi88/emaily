const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

//importing models Schema
const users = require("./models/User");

//connecting to the hosted mongodb
mongoose.connect(keys.mongoURI);

const app = express();

//passport config
require("./services/passport");
const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);
const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(`listening ${port}`);
});
