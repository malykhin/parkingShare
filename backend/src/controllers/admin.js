const _ = require('lodash')

const config = require('../config')
const User = require('../models/User')

const errors = {
  NotLoggedIn: 'Authorisation required.',
  IncorrectCredentials: 'Incorrect username or password.',
  UnknownError: 'Unknown error',
}

const methodsMap = {
  edit: async (id, parkingName, parkingPlaceNumber) => {
    const existingParking = await User.findOne({ parkingName, parkingPlaceNumber, _id: { $exists: true, $ne: id } })
    if (existingParking) {
      return 'This parking place is already occupied!'
    } else {
      await User.findByIdAndUpdate(id, { parkingName, parkingPlaceNumber })
      return null
    }
  },
  delete: async (id) => {
    await User.findByIdAndDelete(id)
    return null
  },
  return: async (id) => {
    await User.findByIdAndUpdate(id, { borrowerId: '', freeToBorrow: false })
    return null
  },
  default: async () => null,
}

const controller = {
  login: (req, res) => {
    const errorMessage = req.query.error ? errors[req.query.error] || errors.UnknownError : ''
    res.render('login', { errorMessage, signInPath: config.baseUrl + '/admin/signIn' })
  },

  settings: async (req, res) => {
    const logoutUrl = config.baseUrl + '/admin/logout'
    const { parkingName, parkingPlaceNumber, id } = req.query
    let errorMessage = ''
    let users = []
    try {
      if (parkingName && parkingPlaceNumber && id) {
        const type = _.get(req, 'params.type', 'default')
        errorMessage = await methodsMap[type](id, parkingName, parkingPlaceNumber)
      }
      users = await User.find({})
    } catch (error) {
      errorMessage = 'Unknown error'
    }
    res.render('settings', { logoutUrl, users, errorMessage })
  },

  logOut: (req, res) => {
    req.logout()
    res.redirect(config.baseUrl + '/admin')
  },
}

module.exports = controller
