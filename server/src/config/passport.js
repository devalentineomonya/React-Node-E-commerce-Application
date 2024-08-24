const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

const config = require('./config');

passport.use(new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.secret,
  callbackURL: "http://localhost:8000/api/auth/google/callback",
},
  async (_, __, profile, done) => {
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
          middleName: profile.displayName.split(" ")[2] ?? " ",
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

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await userModel.findById(jwtPayload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Wrong username or password' });
      }
      if (user.googleId) {
        return done(null, false, { message: 'Password Authentication is not allowed for this account. Try logging in with Google' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Wrong username or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

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

module.exports = passport;
