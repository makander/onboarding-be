const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

const { User } = require('../models');

module.exports = function (passport) {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      (email, password, done) => {
        User.findOne({ where: { email } }).then(async (user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (await user.validPassword(password)) {
            return done(null, user);
          }
          return done(null, false, { message: 'Incorrect password.' });
        });
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });


  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } }).then((user) => {
      done(null, user);
    }).catch(done);
  });
};
