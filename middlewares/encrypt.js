const passwordUtil = require('../utils/password')

const encrypt = async (req, res, next) => {
    const {password = null} = req.body
    if (!password){
        res.json(400).json({
            message: "Error on getting password",
            error: "Request: bad format"            
        })
    }
    const hash = await passwordUtil.encrypt(password)
    res.locals.hash = hash
    next()
}

module.exports = {
    encrypt
}