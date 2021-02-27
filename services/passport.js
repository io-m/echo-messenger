const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// Telling passport to use google OAuth2.0 startegy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleID: profile.id });
      if (!user) {
        const newUser = await new User({
          googleID: profile.id,
        }).save();
        done(null, newUser);
      }
      done(null, user);
    }
  )
);

// serializeUser is passport function for sending JSON to the browser
// with the user.id (mongo _id) as a cookie
passport.serializeUser((user, done) => {
  //we are sending fetched user from DB
  // to passport serialize to send it as a cookie to the browser
  done(null, user.id); // user.id is piece of user model that is put
  //  into cookie as an indetifier (mongo _id NOT googleID)
});

passport.deserializeUser(async (id, done) => {
  user = await User.findById(id);
  done(null, user);
});
