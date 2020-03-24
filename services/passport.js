const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy:true           //to avoid heroku proxy error
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log(profile);
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!

          new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            logo: profile.photos[0].value,
            name: profile.displayName
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
