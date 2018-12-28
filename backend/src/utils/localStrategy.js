const passport = require('passport')
const Local = require('passport-local')

const config = require('../config')

const LocalStrategy = Local.Strategy

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      process.nextTick(() => {
        if (password !== config.password) {
          return done(null, false)
        }
        if (username !== config.username) {
          return done(null, false)
        }
        return done(null, username)
      })
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
