// may need a dotenv line 
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')


// Import Custom Global Middleware and Routes
const restricted = require('../auth/restricted-middleware.js')
const authRouter = require('../auth/authRouter.js')
const postRouter = require('../posts/postsRouter.js')

// create server
const server = express()

// Consume middleware 
server.use(helmet())
server.use(cors())
server.use(express.json())
// Hook up routes
server.use('/api/auth', authRouter)
server.use('/api/user', restricted, postRouter)
// root endpoint
server.get('/', (req, res) => {
    res.send("This is a message from the route of the server!")
})

// export to index.js
module.exports = server