// may need a dotenv line 
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')


// Import Global Middleware and routes

// create server
const server = express()

// Consume middleware 
server.use(helmet())
server.use(cors())
server.use(express.json())
// Hook up routes

// root endpoint
server.get('/', (req, res) => {
    res.send("This is a message from the route of the server!")
})

// export to index.js
module.exports = server