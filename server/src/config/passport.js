const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user.model');
const config = require('./config');

passport.use(new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.secret,
  callbackURL: "http://localhost:8000/api/auth/google/callback",
  // passReqToCallback:true
},
  async (_, __, profile, done) => {
    console.log(profile)
    try {
      let user = await userModel.findOne({
        $or: [
          { googleId: profile.id },
          { email: profile.emails[0].value }
        ]
      });
      if (!user) {
        user = new userModel({
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.displayName.split(" ")[0],
          lastName: profile.displayName.split(" ")[1] ?? " ",
          primaryPhoneNumber: profile._json.phone_number ?? null,
          isVerified: true,
        });
        await user.save();
      }

      done(null, user);
    } catch (error) {
      console.error("Error in Google Strategy:", error);
      done(error, null);
    }
  }
));



passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
