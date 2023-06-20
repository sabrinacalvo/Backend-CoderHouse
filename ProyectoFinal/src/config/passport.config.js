const passport = require('passport');
const local = require('passport-local');
const jwt = require('passport-jwt')
const config = require('../config/index')
const GithubStrategy = require('passport-github2');
const GoogleStrategy = require('passport-google-oauth20');

const { isValidPassword } = require('../utils/cryptPassword');
const cookieExtractor  = require('../utils/cookieExtractor.utils')
const User = require('../dao/models/user.model');
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const { jwt_secret_key } = config.app;

const initializePassport = () => {
  passport.use('jwt', new JWTStrategy(
    {jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: jwt_secret_key,
    }, async (jwt_payload, done) => {
    try {
        return done(null, jwt_payload);
    } catch(error) {
        return done(error);
    }
  })
  );

  // passport.use('register', new LocalStrategy(
  //     { passReqToCallback: true, usernameField: 'email' },
  //     async (req, username, password, done) => {
  //       const { first_name, last_name, email } = req.body;
  //       try {
  //         const user = await User.findOne({ email: username });

  //         if (user) {
  //           console.log('Usuario existe');
  //           return done(null, false);
  //         }

  //         const newUserInfo = {
  //           first_name,
  //           last_name,
  //           email,
  //           password: createHash(password),
  //         };

  //         const newUser = await User.create(newUserInfo);

  //         return done(null, newUser);
  //       } catch (error) {
  //         return done(error);
  //       }
  //     }
  //   )
  // );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });

          if (!user) {
            console.log('Usuario no existe');
            return done(null, false);
          }

          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: 'Iv1.8d5345c15e073354',
        clientSecret: 'd8765594b75e554b970f0ff10536005f8f93bbe8',
        callbackURL: 'http://localhost:8080/auth/githubcallback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await User.findOne({ email: profile._json.email });

          if (!user) {
            const newUserInfo = {
              first_name: profile._json.name,
              last_name: '',
              age: 18,
              email: profile._json.email,
              password: '',
            };

            const newUser = await User.create(newUserInfo);
            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );

   passport.use(
     'google',
     new GoogleStrategy(
       {
         clientID:
           '150524193136-jep7qbiol5amevckfl0so5n427o5kr7l.apps.googleusercontent.com',
         clientSecret: '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',
         callbackURL: 'http://localhost:8080/auth/google/callback',
       },
       async (accessToken, refreshToken, profile, done) => {
         try {
           console.log(profile);

           const user = await User.findOne({ googleId: profile._json.sub });

           if (!user) {
             const newUserInfo = {
               googleId: profile._json.sub,
               first_name: profile._json.given_name,
               last_name: profile._json.family_name,
               age: 18,
               email: profile._json.email,
               password: '',
             };

             const newUser = await User.create(newUserInfo);

             return done(null, newUser);
           }

           done(null, user);
         } catch (error) {
           done(error);
          }
        }
      )
    );
  };

module.exports = initializePassport
