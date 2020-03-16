const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { User } = require('../models');
require('jsonwebtoken');

module.exports = (passport) => {
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      console.log(req.cookies.borderToken);
      token = req.cookies.borderToken;
    }
    return token;
  };

  const opts = {
    jwtFromRequest: cookieExtractor,
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
      }
    )
  );

  passport.use(
    'jwt',
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        return done(null, user.id);
      } catch (err) {
        return done(err);
      }
    })
  );
};
