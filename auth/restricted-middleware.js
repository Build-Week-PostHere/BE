const jwt = require('jsonwebtoken')
// const { jwtSecret } = require('../config/secrets.js')

module.exports = (req, res, next) => {
    const { authorization } = req.headers


    if (authorization) {
        const secret = process.env.JWT_SECRET || 'my secret'
        jwt.verify(authorization, secret, (err, decodedToken) => {

            if (err) {
                res.status(401).json({ message:"Credentials are invalid" })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(400).json({ message:"No credentials have been provided." })
    }
}
