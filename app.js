const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

//importing models Schema
const users = require("./models/User");

//connecting to the hosted mongodb
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//this tells express to use a cookie session, and we set the cookie to expire after 30 days
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	if (process.env.NODE_ENV === "production") {
		const reqType = req.headers["x-forwarded-proto"];
		// if not https redirect to https unless logging in using OAuth
		if (reqType !== "https") {
			req.url.indexOf("auth/google") !== -1
				? next()
				: res.redirect("https://" + req.headers.host + req.url);
		}
	} else {
		next();
	}
});

//passport config
require("./services/passport");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

if (process.env.NODE_ENV == "production") {
	// Express will serve up production assets
	//like main.css and main.js
	app.use(express.static("client/build"));

	//express will serve index.js file if it doesnt recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 3001;

app.listen(port, function() {
	console.log(`listening ${port}`);
});
