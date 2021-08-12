const express = require('express')
const db = require('./config/db')

app = express()

app.use(express.json())
app.use('/', require('./routes/users')) 
app.use('/', require('./routes/companies')) 
app.use('/', require('./routes/auth')) 

app.listen(4000, () => {
    db.createUserTable()
    db.createCompanyTable()
    console.log('Server on! Port 4000')
})

