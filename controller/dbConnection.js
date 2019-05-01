const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'twisha',
  password: 'password',
  database: 'todo',
  insecureAuth: true
})

con.connect(err => {
  if (err) throw err
  console.log('Connected to database')
})

module.exports = con
