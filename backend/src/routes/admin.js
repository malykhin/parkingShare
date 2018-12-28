const express = require('express')
const passport = require('passport')
const { ensureLoggedIn } = require('connect-ensure-login')

const admin = require('../controllers/admin')
const config = require('../config')

const router = express.Router()

router.get('/admin', admin.login)
router.get('/admin/settings/:type', ensureLoggedIn(config.baseUrl + '/admin?error=NotLoggedIn'), admin.settings)
router.get('/admin/logOut', admin.logOut)

router.post(
  '/admin/signIn',
  passport.authenticate('local', {
    successRedirect: config.baseUrl + '/admin/settings/view',
    failureRedirect: config.baseUrl + '/admin?error=IncorrectCredentials',
    failureFlash: true,
  }),
)

module.exports = router
