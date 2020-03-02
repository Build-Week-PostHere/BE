const db = require('../data/dbConfig.js')

// export helpers to the router
module.exports = {
    // add helpers
    register,
    findById,
    findBy
}

function register(user) {
    return db('users').insert(user, 'id')
        // .then((newID) => {
        //     const [id] = newID
        //     return findById(id)
        // })
}

function findBy(username) {
    return db('users').select('id', 'username', 'password').where(username).first()
}

function findById(id) {
    return db('users').select('id', 'username').where({ id })
}