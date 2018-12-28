const mongoose = require('mongoose')

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  deviceTokens: [
    {
      type: String,
    },
  ],
  ownedPlaceId: String,
  token: String,
})

module.exports = mongoose.model('User', User)
