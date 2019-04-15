const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const flash = require('connect-flash')

require('./utils/localStrategy')
require('./utils/db')
require('./utils/scheduler')

const { errorResponseHandler } = require('./utils/response')
const config = require('./config')

const parking = require('./routes/parking')
const admin = require('./routes/admin')
const app = express()

app.disable('x-powered-by')
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use('/', admin)
app.use('/api/v1', parking)

app.use('*', (req, res) => {
  console.log(`Unknown path ${req.protocol}://${req.get('host')}${req.originalUrl}`)
  const error = new Error('UnknownPath')
  errorResponseHandler(res, error)
})

app.listen(config.port, () => console.log(`App is listening on: ${config.port}`))
