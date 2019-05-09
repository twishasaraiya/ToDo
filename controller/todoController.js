const con = require('./dbConnection.js')
/* color = purple,pink,yellow,blue,light-green */
const COLORS = [
  '#d7aefb',
  '#fdcfe8',
  '#fff475',
  '#a7ffeb',
  '#aecbfa',
  '#ccff90'
]

exports.getList = (req, res) => {
  var user_id = req.session.userId
  console.log('User id', user_id)
  console.log('User Name', req.session.username)

  var sql =
    'SELECT users.username, todoList.id, todoList.text, todoList.complete, todoList.color FROM users INNER JOIN todoList WHERE users.id = todoList.user_id AND users.id = "' +
    user_id +
    '"'
  con.query(sql, (err, result) => {
    if (err) {
      throw err
      res.send('Error Occured')
    } else {
      if (result.length > 0) {
        // console.log('TODO LIST', result)
        res.render('todo', { username: req.session.username, todos: result })
      } else {
        res.render('todo', {
          username: req.session.username,
          todos: 'You have no todos yet'
        })
      }
    }
  })
}

exports.addTask = (req, res) => {
  console.log('REQUEST', req.body)
  var newTask = {
    text: req.body.text,
    user_id: req.session.userId,
    created_date: new Date(),
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  }
  var sql = 'INSERT INTO todoList SET ?'
  con.query(sql, newTask, (err, result) => {
    if (err) {
      throw err
      res.send(500).send('Something broke!')
    } else {
      res.redirect('/todos')
    }
  })
}

exports.done = (req, res) => {
  console.log('UPDATE TASK ', req.body)
  var sql =
    'UPDATE todoList SET complete = "' +
    req.body.complete +
    '" WHERE id = "' +
    req.body.id +
    '"'
  console.log('UPDATE TASK SQL', sql)
  con.query(sql, (err, result) => {
    if (err) throw err
    console.log('UPDATE COMPLETED')
    res.send('UPDATE COMPLETED')
  })
}

exports.modify = (req, res) => {
  console.log('modify TASK ', req.body)
  var sql =
    'UPDATE todoList SET text = "' +
    req.body.text +
    '" WHERE id = "' +
    req.body.id +
    '"'
  console.log('MODIFY TASK SQL', sql)
  con.query(sql, (err, result) => {
    if (err) throw err
    console.log('MODIFY COMPLETED')
    res.send('MODIFY COMPLETED!')
  })
}
