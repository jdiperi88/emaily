const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

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
		}
	)
);
