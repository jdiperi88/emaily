const express = require("express");
const passport = require("passport");
const Router = express.Router();
Router.get(
	"/google",
	// this passes the user to google for authentication
	passport.authenticate("google", { scope: ["profile", "email"] })
);

Router.get("/google/callback", passport.authenticate("google"));

module.exports = Router;
