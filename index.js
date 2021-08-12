const express = require('express')
const db = require('./config/db')

app = express()

app.use(express.json())
app.use('/', require('./routes/users')) 

app.listen(4000, () => {
    db.createUserTable()
    console.log('Server on! Port 4000')
})

