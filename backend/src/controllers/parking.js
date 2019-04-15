const User = require('../models/User')
const Place = require('../models/ParkingPlace')
const { responseHandler, errorResponseHandler } = require('../utils/response')

const controller = {
  createUser: async (req, res) => {
    try {
      const user = req.body
      const result = await User.create(user)
      responseHandler(res, result)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  getFreeParkPlaces: async (req, res) => {
    try {
      const freeCards = await Place.find({ freeToBorrow: true })
      responseHandler(res, freeCards)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  sharePlace: async (req, res) => {
    try {
      const { ownerId } = req.user.id
      const { from, to } = req.query
      const result = await Place.findOneAndUpdate(
        { ownerId },
        { freeToBorrow: true, freeFrom: from, freeTo: to, borrowedByUserId: '' },
      )

      responseHandler(res, result)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  bookPlace: async (req, res) => {
    try {
      const { userId } = req.user.id
      const { placeId, from, to } = req.query
      const result = await Place.findOneAndUpdate(
        { id: placeId, freeToBorrow: true },
        { freeToBorrow: false, borrowedByUserId: userId, borrowedFrom: from, borrowedTo: to },
      )
      responseHandler(res, result)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  refusePlace: async (req, res) => {
    try {
      const { placeId } = req.query
      const result = await Place.findOneAndUpdate(
        { id: placeId, freeToBorrow: false },
        { freeToBorrow: true, borrowedByUserId: '' },
      )
      responseHandler(res, result)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  pushToken: async (req, res) => {
    try {
      const { userId } = req.user.id
      const { token } = req.query
      const result = await User.findOneAndUpdate({ id: userId }, { $push: { deviceTokens: token } })
      responseHandler(res, result)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  getPlace: async (req, res) => {
    try {
      const { userId } = req.user.id
      const result = await User.findOne({ ownerId: userId })
      responseHandler(res, result)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
}

module.exports = controller
