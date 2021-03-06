const db = require("../config/db")
const passwordUtil = require('../utils/password')
const dotenv = require("dotenv-safe")
const jwt = require('jsonwebtoken')

dotenv.config()

const authUser = async (req, res, next) => {
    try{
        const {email = null, password = null} = req.body
    
        if (!email || !password){
            res.status(400).json({
                message: "Error on getting email or password",
                error: "Request: bad format" 
            })
            return
        }
    
        const connection = await db.connect()
        const query = "SELECT * FROM users WHERE email = ?"
        const value = [email]
        const [user] = await connection.query(query, value)
    
        if (user.length !== 0){
            try{
                const check = await passwordUtil.check(password, user[0].password)
                if (check){
                    const token = jwt.sign(
                        {
                            id: user.id,
                            email: user.email
                        }, 
                        process.env.SECRET || 'desafio-player-2',
                        {
                            expiresIn: '1d',
                        }
                    )
                    res.status(200).json({
                        message: "Token generated",
                        token: token
                    })
                    return
                }
            } catch (e) {
                res.status(500).json({
                    message: "Error on checking",
                    error: e.message 
                })
                return
            }
            
        }
        res.status(403).json({
            message: "Error on authentication",
            error: "Incorrect email or password"
        })
        return
    } catch(e) {
        res.status(500).json({
            message: "Error on authentication",
            error: e.message
        })
        return
    }
}

module.exports = {
    authUser,
}