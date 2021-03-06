const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const todoController = require('../controller/todoController')

// middleware function to check for logged in users
const checkLoggedIn = (req, res, next) => {
  if (req.session.userName) {
    return next()
  }
  // res.redirect('/')
}

router.get('/', (req, res) => {
  res.render('index')
})

/**
 ** Signup
 **/
router.post('/signup', userController.signup)

/**
 ** Login
 **/
router.post('/login', userController.login)

/**
 ** Logout
 **/

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

/**
 ** Todo Task
 **/
router.get('/todos', todoController.getList)
router.get('/todos/:id', todoController.getTask)
router.post('/todos/add', todoController.addTask)
router.post('/todos/done', todoController.done)
router.post('/todos/modify', todoController.modify)
router.post('/todos/delete', todoController.delete)

router.get('*', (req, res) => {
  res.render('404')
})

module.exports = router
