const express = require('express')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')

const app = express()

// set template engine
app.set('view engine', 'ejs')

app.use(
  session({
    secret: 'heyhey',
    resave: true,
    saveUninitialized: true
  })
)
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use('/', routes)

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
