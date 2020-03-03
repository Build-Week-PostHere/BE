const jwt = require('jsonwebtoken')
// const { jwtSecret } = require('../config/secrets.js')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    const id  = req.params.id

    if (authorization) {
        const secret = process.env.JWT_SECRET || 'my secret'
        jwt.verify(authorization, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message:"Credentials are invalid" })
            }else if (decodedToken.subject !== id) {
                res.status(401).json({ message:"You can only access your own posts!" })
            } else {
                req.decodedToken = decodedToken
                console.log("This is the decoded token:", decodedToken)
                next()
            }
        })
    } else {
        res.status(400).json({ message:"No credentials have been provided." })
    }
}
