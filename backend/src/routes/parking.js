const express = require('express')

const { getFreeParkPlaces, sharePlace, bookPlace, refusePlace, pushToken, getPlace } = require('../controllers/parking')

const router = express.Router()

router.get('/freeParkPlaces', getFreeParkPlaces)
router.post('/sharePlace', sharePlace)
router.put('/bookPlace', bookPlace)
router.put('/refusePlace', refusePlace)
router.put('/pushToken', pushToken)
router.get('/getPlace', getPlace)

module.exports = router
