const express = require('express')
const router = express.Router()
const session = require('../middlewares/session')
const companies = require('../controllers/companies')

router.get('/companies', session.verify, companies.getCompanies)
router.post('/companies', session.verify, companies.createCompany)
router.put('/companies/:cnpj', session.verify, companies.editCompany)
router.delete('/companies/:cnpj', session.verify, companies.deleteCompany)

module.exports = router