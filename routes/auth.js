const express = require("express");
const passport = require("passport");
const Router = express.Router();
Router.get(
	"/google",
	// this passes the user to google for authentication
	passport.authenticate("google", { scope: ["profile", "email"] })
);

//this is the callback route designated in the google developer console
Router.get("/google/callback", passport.authenticate("google"));

Router.get("/current_user", (req, res) => {
	// res.send(req.session);
	res.send(req.user);
});
Router.get("/logout", (req, res) => {
	req.logout();
	res.send(req.user);
});
module.exports = Router;
