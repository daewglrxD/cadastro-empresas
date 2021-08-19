const express = require('express')
const router = express.Router()
const encrypt = require('../middlewares/encrypt')
const session = require('../middlewares/session')
const users = require('../controllers/users')

router.get('/users', session.verify, users.getUsers)
router.post('/users', encrypt.encrypt, users.createUser)

module.exports = router