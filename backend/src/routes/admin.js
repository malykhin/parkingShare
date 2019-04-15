const express = require('express')
const passport = require('passport')
const { ensureLoggedIn } = require('connect-ensure-login')

const admin = require('../controllers/admin')
const config = require('../config')

const router = express.Router()

router.get('/admin', admin.login)
router.get('/admin/users', ensureLoggedIn(config.baseUrl + '/admin?error=NotLoggedIn'), admin.users)
router.post('/admin/users/edit', ensureLoggedIn(config.baseUrl + '/admin?error=NotLoggedIn'), admin.editUser)

router.get('/admin/parkings', ensureLoggedIn(config.baseUrl + '/admin?error=NotLoggedIn'), admin.parkings)
router.post('/admin/parkings', ensureLoggedIn(config.baseUrl + '/admin?error=NotLoggedIn'), admin.createParking)
router.post('/admin/parkings/return', ensureLoggedIn(config.baseUrl + '/admin?error=NotLoggedIn'), admin.returnToOwner)
router.post('/admin/parkings/edit', ensureLoggedIn(config.baseUrl + '/admin?error=NotLoggedIn'), admin.editParking)
router.post('/admin/parkings/delete', ensureLoggedIn(config.baseUrl + '/admin?error=NotLoggedIn'), admin.deleteParking)
router.get('/admin/logOut', admin.logOut)

router.post(
  '/admin/signIn',
  passport.authenticate('local', {
    successRedirect: config.baseUrl + '/admin/users',
    failureRedirect: config.baseUrl + '/admin?error=IncorrectCredentials',
    failureFlash: true,
  }),
)

module.exports = router
