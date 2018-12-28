const port = process.env.PORT
const sessionSecret = process.env.SESSION_SECRET
const baseUrl = process.env.BASE_URL

const password = process.env.PASSWORD
const username = process.env.USERNAME

const mongoUrl = process.env.MONGO_URL
const dbName = process.env.DB_NAME

const mailgunApiKey = process.env.MAILGUN_API_KEY
const mailgunDomain = process.env.MAILGUN_DOMAIN

const firebaseUrl = process.env.FIREBASE_URL

module.exports = {
  port,
  sessionSecret,
  baseUrl,
  password,
  username,
  mongoUrl,
  dbName,
  mailgunApiKey,
  mailgunDomain,
  firebaseUrl,
}
