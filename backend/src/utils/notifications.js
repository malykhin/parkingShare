const admin = require('firebase-admin')

const serviceAccount = require('../keys/parkingshare.json')
const User = require('../models/User')
const { firebaseUrl } = require('../config')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseUrl,
})

async function notifyFreeSpace() {
  const deviceIds = (await User.find({ deviceId: { $ne: '', $exists: true } })).map((item) => item.deviceId)
  const messages = deviceIds.map((id) => ({
    notification: {
      body: 'You can borrow a free space now!',
      title: 'Free space avaliable!',
    },
    token: id,
  }))

  const promises = messages.map((message) => admin.messaging().send(message))

  return Promise.all(promises)
    .then((result) => {
      console.log('Message sent', result)
    })
    .catch((error) => {
      console.log('Error sending message', error)
    })
}

module.exports = {
  notifyFreeSpace,
}
