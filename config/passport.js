const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { User } = require('../models');
require('jsonwebtoken');

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      (email, password, done) => {
        User.findOne({ where: { email } }).then(async (user) => {
          if (!user) {
            return done(null, false);
          }
          if (await user.validPassword(password)) {
            return done(null, user);
          }
          return done(null, false);
        });
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => {
        done(null, user);
      })
      .catch(done);
  });

  passport.use(
    'jwt',
    new JwtStrategy(opts, (jwtPayload, done) => {
      console.log('payload received', jwtPayload);
      User.findOne({ where: { id: jwtPayload } })
        .then((user) => done(null, user))
        .catch((err) => done(err));
    }),
  );
};
