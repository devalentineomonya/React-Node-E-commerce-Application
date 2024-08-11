const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userModel = require('../models/user.model');
const config = require('./config');

passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.secret,
    callbackURL: "http://localhost:8000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userModel.findOne({ googleId: profile.id });

      if (!user) {
        user = new userModel({
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.displayName.split(" ")[0],
          lastName: profile.displayName.split(" ")[1] ?? " ",
          primaryPhoneNumber: profile._json.phone_number ?? null, 
          isActive: true, 
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

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await userModel.findById(jwtPayload.id);

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        
        done(error, false);
    }
}));


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
