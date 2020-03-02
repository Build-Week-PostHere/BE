const server = require('./api/server.js')
// may need an env line

// set up the dynamic port
const PORT = process.env.PORT || 4000
// initiate the server
server.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}.`)
})