const jwt = require('jsonwebtoken')
const dotenv = require('dotenv-safe')

dotenv.config()

const verify = async (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token){
        res.status(401).json({
            message: "Error on verifying user",
            error: "No token provided"
        })
        return
    }

    try {
        const verification = await jwt.verify(token, process.env.SECRET)
        res.locals.userID = verification.id
        res.locals.userEmail = verification.email
    } catch (e) {
        res.status(403).json({
            message: "Error on verifying user",
            error: "Forbidden"
        })
        return
    }
    next()
}

module.exports = {
    verify
}