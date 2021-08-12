const express = require('express')
const router = express.Router()
const encrypt = require('../middlewares/encrypt')
const users = require('../controllers/users')
const auth = require('../controllers/auth')

router.get('/users', users.getUsers)
router.post('/users', encrypt.encrypt, users.createUser)

router.post('/login', auth.authUser)
router.post('/logout', auth.logoutUser)

module.exports = router