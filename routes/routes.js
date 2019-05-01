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
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', userController.signup)

/**
 ** Login
 **/
router.get('/login', (req, res) => {
  res.render('login')
})

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
router.post('/todos/add', todoController.addTask)
router.post('/todos/done', todoController.done)
router.post('/todos/modify', todoController.modify)

router.get('*', (req, res) => {
  res.render('404')
})

module.exports = router
