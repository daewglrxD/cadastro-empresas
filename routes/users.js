const express = require('express')
const router = express.Router()
const encrypt = require('../middlewares/encrypt')
const session = require('../middlewares/session')
const users = require('../controllers/users')
const auth = require('../controllers/auth')
const companies = require('../controllers/companies')

router.get('/users', session.verify, users.getUsers)
router.post('/users', encrypt.encrypt, users.createUser)

router.get('/companies', session.verify, companies.getCompanies)
router.post('/companies', session.verify, companies.createCompany)

router.post('/login', auth.authUser)
router.post('/logout', auth.logoutUser)

module.exports = router