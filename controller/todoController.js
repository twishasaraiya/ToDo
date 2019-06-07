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
  console.log('get list of tasks')
  var user_id = req.session.userId

  if (typeof user_id === 'undefined') {
    res.status(400).send('Please login/signup')
  }
  var sql =
    'SELECT users.username, todoList.id, todoList.text, todoList.complete, todoList.color FROM users INNER JOIN todoList WHERE users.id = todoList.user_id AND users.id = "' +
    user_id +
    '"'
  console.log('query', sql)
  con.query(sql, (err, result) => {
    if (err) {
      console.error('[GET LIST]', err)
      res.send('Error Occured')
    } else {
      console.log('TODO LIST', result)
      res.render('todo', { username: req.session.username, todos: result })
    }
  })
}

exports.getTask = (req, res) => {
  var user_id = req.session.userId
  var sql =
    'SELECT todoList.text, todoList.complete, todoList.color FROM users INNER JOIN todoList WHERE users.id = todoList.user_id AND users.id = "' +
    user_id +
    '" AND todoList.id = "' +
    req.params.id +
    '"'
  con.query(sql, (err, result) => {
    if (err) {
      throw err
      res.send('Error Occured')
    } else {
      res.send({ task: result[0] })
    }
  })
}
exports.addTask = (req, res) => {
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
      res.status(500).send('Something broke!')
    } else {
      res.send({ taskId: result.insertId })
    }
  })
}

exports.done = (req, res) => {
  // console.log('UPDATE TASK ', req.body)
  var sql =
    'UPDATE todoList SET complete = "' +
    req.body.complete +
    '" WHERE id = "' +
    req.body.id +
    '"'
  con.query(sql, (err, result) => {
    if (err) throw err
    console.info('UPDATE COMPLETED')
    res.send('UPDATE COMPLETED')
  })
}

exports.modify = (req, res) => {
  // console.log('modify TASK ', req.body)
  var sql =
    'UPDATE todoList SET text = "' +
    req.body.text +
    '" WHERE id = "' +
    req.body.id +
    '"'
  con.query(sql, (err, result) => {
    if (err) throw err
    console.info('MODIFY COMPLETED')
    res.send('MODIFY COMPLETED!')
  })
}

exports.delete = (req, res) => {
  var sql = 'DELETE FROM todoList WHERE id = "' + req.body.id + '"'
  console.log('[DELETE SQL]', sql)
  con.query(sql, (err, result) => {
    if (err) throw err
    console.info('DELETE COMPLETED')
    res.send(result)
  })
}
