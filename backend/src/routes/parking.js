const express = require('express')

const {
  getFreeParkPlaces,
  sharePlace,
  bookPlace,
  refusePlace,
  pushToken,
  getPlace,
  createUser,
} = require('../controllers/parking')

const router = express.Router()

router.post('/createUser', createUser)
router.get('/freeParkPlaces', getFreeParkPlaces)
router.post('/sharePlace', sharePlace)
router.put('/bookPlace', bookPlace)
router.put('/refusePlace', refusePlace)
router.put('/pushToken', pushToken)
router.get('/getPlace', getPlace)

module.exports = router
