const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require("../models/user.model")
const passport = require('passport');
const config = require('./config');

passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.secret,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        
        let user = await userModel.findOne({ googleId: profile.id });
        if (!user) {
            user = new userModel({
                googleId: profile?.id,
                firstName: profile?.displayName?.split(" ")[0],
                lastName:profile?.displayName?.split(" ")[1] ?? "",
                middleName:profile?.displayName?.split(" ")[2] ?? "",
                email: profile.emails[0].value,
            });
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));
