const cron = require('node-cron')

const User = require('../models/User')

const resolveAllPlaces = async () => {
  try {
    const freeOverduePlaces = await User.find({
      freeToBorrow: true,
      dateTo: { $lt: new Date() },
    })

    const borrowedOverduePlaces = await User.find({
      borrowerId: { $exists: true, $ne: '' },
      dateTo: { $lt: new Date() },
    })

    const borrowedUpToDatePlaces = await User.find({
      borrowerId: { $exists: true, $ne: '' },
      dateTo: { $gt: new Date() },
    })

    for (const place of [...freeOverduePlaces, ...borrowedOverduePlaces]) {
      await User.findByIdAndUpdate(place._id, { borrowerId: '', freeToBorrow: false })
    }

    for (const place of borrowedUpToDatePlaces) {
      await User.findByIdAndUpdate(place._id, { borrowerId: '', freeToBorrow: true })
    }

    console.log('Cron finished')
  } catch (error) {
    console.log(error)
  }
}

const task = cron.schedule('0 0 1 * * *', resolveAllPlaces)

task.start()
