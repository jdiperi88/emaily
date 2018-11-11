const express = require("express");
const Router = express.Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");

Router.get("/current_user", (req, res) => {
	res.send(req.user);
});

Router.post("/stripe", requireLogin, async (req, res) => {
	const charge = await stripe.charges.create({
		amount: 500,
		currency: "usd",
		description: "$5 for 5 credits",
		source: req.body.id
	});
	req.user.credits += 5;
	const user = await req.user.save();
	res.send(user);
});

Router.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
	const { title, subject, body, recipients } = req.body;

	const survey = new Survey({
		title,
		subject,
		body,
		recipients: recipients.split(",").map(email => ({
			email: email.trim()
		})),
		_user: req.user.id,
		dateSent: Date.now()
	});
});

module.exports = Router;
