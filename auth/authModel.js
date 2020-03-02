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

function findBy(filter) {
    return db('users').select('id', 'username').where(filter)
}

function findById(id) {
    return db('users').select('id', 'username').where({ id })
}