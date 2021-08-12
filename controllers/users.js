const db = require("../config/db")

const getUsers = async (req, res, next) => {
    try {
        const connection = await db.connect();
        const query = 'SELECT * FROM users;'
        const [rows] = await connection.query(query)
        if (rows.length === 0){
            res.status(404).json({
                message: "Not found"
            })
            return
        }
        res.status(200).json(rows)
    } catch (e) {
        res.status(500).json({
            message: "Error on getting users",
            error: e.message
        })
    }
}

const createUser = async (req, res, next) => {
    try{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(req.body.email).toLowerCase())){
            res.status(400).json({
                message: "Error on creation",
                error: "Please enter a valid email"
            })
            return
        }
        const connection = await db.connect();
        const query = 'INSERT INTO users(name, email, password) VALUES (?, ?, ?);'
        const values = [req.body.name, req.body.email, res.locals.hash]
        await connection.query(query, values)
        res.status(201).json({
            message: "Created"
        })
    } catch (e) {
        res.status(500).json({
            message: "Error on creation",
            error: e.message
        })
    }
}

module.exports = {
    getUsers,
    createUser,
}
