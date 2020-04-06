const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { User } = require('../models');
const { Task } = require('../models');
const { List } = require('../models');
const { Department } = require('../models');
require('jsonwebtoken');

module.exports = (passport) => {
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
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
        User.findOne({
          where: { email },
          include: [
            {
              model: Task,
            },
            {
              model: Department,
            },
            {
              model: List,
            },
          ],
        }).then(async (user) => {
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
        const user = await User.findOne({
          where: { id: jwtPayload.id },
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};
