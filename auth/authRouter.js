const Users = require('./authModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// bring in the secret
// const { jwtSecret } = require('../config/secrets.js')
// create the router
const router = require('express').Router()
// endpoints

// (1) - REGISTRATION ENDPOINT

router.post('/register', (req, res) => {
    const newUser = req.body
    // Convert password to hash before reaching db
    const hash = bcrypt.hashSync(newUser.password, 8)
    newUser.password = hash

    if (newUser && newUser.username && newUser.password) {
        Users.register(newUser)
            .then((newId) => {
                console.log("This is the response from register:", newId)
                res.status(201).json({ message:"Registered!", newId: newId})
            })
            .catch(({name, message, stack}) => {
                res.status(500).json({ name:name, message:message, stack:stack })
            })
    } else {
        res.status(400).json({ message:"Please provide a username and password."})
    }
})

// (2) - LOGIN ENDPOINT
router.post('/login', (req, res) => {

    const { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                token = generateToken(user) 
                console.log("This is the user:", user)
                res.status(200).json({ message:`Welcome, ${user.username}!`, id: user.id, token})
            } else {
                res.status(401).json({ message:"Username or password is incorrect." })
            }
        })
        .catch(({name, message, stack}) => {
            res.status(500).json({ name:name, message:message, stack:stack })
        })
})

// LOCAL MIDDLEWARE FOR TOKEN GENERATION
function generateToken(user) {
    // payload
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = process.env.JWT_SECRET || 'my secret'

    // options
    const options = {
        expiresIn: '8h'
    }

    // signature
    return jwt.sign(payload, secret, options)
}

module.exports = router