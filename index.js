const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)

// const express = require('express')
// const mongoose = require('mongoose')
// const cookieSession = require('cookie-session')
// const passport = require('passport')
// const bodyParser = require('body-parser')
// const keys = require('./config/keys')

// // reorder the requiring file can cause a DB error when running the server
// require('./models/user')
// require('./services/passport')

// // const authRoutes = require('./routes/authRoutes')

// mongoose.connect(keys.mongoURI)

// const app = express()

// app.use(bodyParser.json())

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000, // the session will last for one month
//     keys: [keys.cookieKey] // the key stored in the hidden file
//   })
// )

// app.use(passport.initialize())
// app.use(passport.session())

// // authRoutes(app)
// require('./routes/authRoutes')(app)
// // billingRoutes(app)
// require('./billingRoutes')(app)
// // means in the production use the provided port
// // otherwise in the development env use port 5000
// const PORT = process.env.PORT || 5000
// app.listen(PORT)
