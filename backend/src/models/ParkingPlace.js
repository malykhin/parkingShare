const mongoose = require('mongoose')

const ParkingPlace = new mongoose.Schema(
  {
    note: String,
    zone: String,
    location: String,
    number: String,
    ownerId: String,
    borrowedByUserId: String,
    freeToBorrow: Boolean,
    freeFrom: Date,
    freeTo: Date,
    borrowedFrom: Date,
    borrowedTo: Date,
  },
  {
    toObject: {
      transform: (doc, ret) => {
        delete ret.token
        delete ret.confirmationToken
      },
    },
  },
)

module.exports = mongoose.model('ParkingPlace', ParkingPlace)
