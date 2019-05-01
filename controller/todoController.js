const con = require('./dbConnection.js')

exports.getList = (req, res) => {
  var user_id = req.session.userId
  console.log('User id', user_id)
  console.log('User Name', req.session.username)

  var sql =
    'SELECT users.username, todoList.id, todoList.text, todoList.complete FROM users INNER JOIN todoList WHERE users.id = todoList.user_id AND users.id = "' +
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
  var newTask = {
    text: req.body.task,
    user_id: req.session.userId,
    created_date: new Date()
  }
  var sql = 'INSERT INTO todoList SET ?'
  con.query(sql, newTask, (err, result) => {
    if (err) {
      throw err
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
