const _ = require('lodash')

const config = require('../config')
const User = require('../models/User')
const ParkingPlace = require('../models/ParkingPlace')

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

  users: async (req, res) => {
    const logoutUrl = config.baseUrl + '/admin/logout'
    const parkingsUrl = config.baseUrl + '/admin/parkings'
    const users = await User.find({})
    const parkingOptions = (await ParkingPlace.find({})).map((parking) => ({
      label: `${parking.zone} ${parking.location} ${parking.number}`,
      value: parking.id,
    }))
    parkingOptions.unshift({ label: 'Select...', value: '' })
    res.render('users', { logoutUrl, parkingsUrl, users, parkingOptions })
  },

  editUser: async (req, res) => {
    const redirectPath = config.baseUrl + '/admin/users'
    const { id } = req.body
    await User.findByIdAndUpdate(id, _.omit(req.body, 'id'))
    res.redirect(redirectPath)
  },

  parkings: async (req, res) => {
    const logoutUrl = config.baseUrl + '/admin/logout'
    const usersUrl = config.baseUrl + '/admin/users'
    const parkingPlaces = await ParkingPlace.find({})
    res.render('parkings', { logoutUrl, usersUrl, parkingPlaces })
  },

  createParking: async (req, res) => {
    const redirectPath = config.baseUrl + '/admin/parkings'
    const parkingPlace = { ...req.body, ownerId: '', borrowedByUserId: '', freeToBorrow: false }
    await ParkingPlace.create(parkingPlace)
    res.redirect(redirectPath)
  },

  returnToOwner: async (req, res) => {
    const redirectPath = config.baseUrl + '/admin/parkings'
    const { id } = req.body
    await ParkingPlace.findByIdAndUpdate(id, { borrowedByUserId: '', freeToBorrow: false })
    res.redirect(redirectPath)
  },

  editParking: async (req, res) => {
    const redirectPath = config.baseUrl + '/admin/parkings'
    const { id } = req.body
    await ParkingPlace.findByIdAndUpdate(id, _.omit(req.body, 'id'))
    res.redirect(redirectPath)
  },

  deleteParking: async (req, res) => {
    const redirectPath = config.baseUrl + '/admin/parkings'
    const { id } = req.body
    await ParkingPlace.findByIdAndDelete(id)
    res.redirect(redirectPath)
  },

  logOut: (req, res) => {
    req.logout()
    res.redirect(config.baseUrl + '/admin')
  },
}

module.exports = controller
