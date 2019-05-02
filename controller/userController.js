const con = require('./dbConnection')

exports.signup = (req, res) => {
  console.log('REQUEST ', req.body)
  var today = new Date()
  var newUser = {
    username: req.body.username,
    email: req.body.email,
    created_date: today
  }
  console.log('NEW USER', newUser)

  var sql = 'INSERT INTO users SET ?'
  con.query(sql, newUser, (err, result) => {
    if (err) {
      throw err
      res.send('Error Occured')
    } else {
      console.log('NEW USER INSERTED ', result.insertId)
      req.session.userId = result.insertId
      req.session.username = req.body.username
      res.send({
        message: 'Successfully Signed Up',
        redirect: 'http://localhost:3001/todos'
      })
    }
  })
}

exports.login = (req, res) => {
  console.log('REQUEST', req.body)
  var sql = 'SELECT * FROM users WHERE email = "' + req.body.email + '"'
  con.query(sql, (err, result) => {
    if (err) {
      throw err
      res.send('Error Occurred')
    } else {
      if (result.length > 0) {
        console.log('Logged in successfully', result[0])
        req.session.userId = result[0].id
        req.session.username = result[0].username
        res.send({
          message: 'Successfully loggged in',
          redirect: 'http://localhost:3001/todos'
        })
      } else {
        throw err
        res.send('Email does not match')
      }
    }
  })
}
