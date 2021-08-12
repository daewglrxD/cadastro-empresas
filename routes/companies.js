const express = require('express')
const router = express.Router()
const session = require('../middlewares/session')
const companies = require('../controllers/companies')

router.get('/companies', session.verify, companies.getCompanies)
router.post('/companies', session.verify, companies.createCompany)
router.put('/companies', session.verify, companies.editCompany)
router.delete('/companies', session.verify, companies.deleteCompany)

module.exports = router