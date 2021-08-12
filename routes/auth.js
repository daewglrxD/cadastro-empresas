const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')

router.post('/login', auth.authUser)
router.post('/logout', auth.logoutUser)

module.exports = router