const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

//importing models Schema
const users = require("./models/User");

//connecting to the hosted mongodb
mongoose.connect(keys.mongoURI);

const app = express();

//this tells express to use a cookie session, and we set the cookie to expire after 30 days
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
	res.send({ hi: "welcome" });
});
//passport config
require("./services/passport");
const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);
const port = process.env.PORT || 3001;

app.listen(port, function() {
	console.log(`listening ${port}`);
});
