import passport from "passport";
import FacebookTokenStrategy from 'passport-facebook-token';

// passport congfig for facebook
passport.use(new FacebookTokenStrategy(
  {
    clientID: '232995725481180',
    clientSecret: 'd02c1bf29d9a10a296764a67a7a4afe1',
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));

export default passport;
