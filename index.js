const express = require('express')
const dotenv = require('dotenv-safe')
const db = require('./config/db')

dotenv.config()

app = express()

app.use(express.json())
app.use('/', require('./routes/users')) 
app.use('/', require('./routes/companies')) 
app.use('/', require('./routes/auth')) 

const port = 3000
const server = app.listen(port, () => {
    db.createUserTable()
    db.createCompanyTable()
    console.log(`Server on! Port ${port}`)
})

module.exports = server
