const express = require("express");
const passport = require("passport");
const Router = express.Router();
Router.get(
	"/google",
	// this passes the user to google for authentication
	passport.authenticate("google", { scope: ["profile", "email"] })
);

//this is the callback route designated in the google developer console
Router.get("/google/callback", passport.authenticate("google"), function(
	req,
	res
) {
	res.redirect("/surveys");
});

Router.get("/current_user", (req, res) => {
	// res.send("user");
	res.send(req.user);
});
Router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});
module.exports = Router;
