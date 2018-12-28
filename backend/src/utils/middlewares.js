const User = require('../models/User')
const { errorResponseHandler } = require('../utils/response')

async function getUser(req, res, next) {
  try {
    const token = req.header('x-token')
    // exchange token to email
    const user = await User.findOne({ token })
    if (!user) {
      throw new Error('AuthError')
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    errorResponseHandler(res, error)
  }
}

module.exports = {
  getUser,
}
