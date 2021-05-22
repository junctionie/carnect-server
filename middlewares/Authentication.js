const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const callbackURL = 'http://localhost:3000/oauth';
const Users = require('../models/index').Users;

require('dotenv').config();

passport.initialize();

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.APIKEY,
      clientSecret: process.env.CLIENTKEY, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // 사용자의 정보는 profile에 들어있다.
      const { id, provider, displayName } = profile;
      console.log('Test');
      try {
        const user = await Users.findOrCreate({
          where: { userId: id },
          raw: true,
          defaults: {
            userId: id,
            displayName,
            provider,
          },
        });
        console.log('refresh');
        done(null, { accessToken, refreshToken, ...user });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const authenticate = (req, res, next) => {
  try {
    return passport.authenticate('kakao', { session: false })(req, res, next);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { authenticate, passport };
