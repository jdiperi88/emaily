const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

//the first argument of serializeUser is the information passed into the done callback function when the strategy was instantiated
passport.serializeUser((user, done) => {
	//done allows passport to proceed to the next step of authentication
	//first argument is if there are any errors
	//second argument is the piece of auth information
	done(null, user.id);
});

//take the id we stuffed in the cookie and extract it back out
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});
// creates a new instance of the oauth strategy
//console.developers.google.com
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(`access token: ${accessToken}`);
			console.log(`refresh token: ${refreshToken}`);
			console.log(`profile: ${JSON.stringify(profile)}`);
			console.log(`done: ${done}`);
			User.findOne({ googleID: profile.id }).then(existingUser => {
				if (existingUser) {
					//we already have that user

					//done() allows passport to know that it can proceed to the next step of the authentication
					//first argument is where an error argument is passed in
					// second argument is the user information that was created
					done(null, existingUser);
				} else {
					// since the new user to mongodb is asynch, we need to make sure we chain .then to invoke done once the insertion has been completed.
					new User({ googleID: profile.id }).save().then(newUser => {
						done(null, newUser);
					});
				}
			});
		}
	)
);
