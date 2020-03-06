const db = require('../data/dbConfig.js')
const Users = require('./authModel.js')

// helpers:
// register,
// findById,
// findBy

describe('auth model', () => {     
    it('REGISTER: Should add a user to the database', () => {
        Users.register({username:'coffe', password:'pass'})
            .then((response) => {
                expect(db('users').toHaveLength(1))
            })
    })
    it('LOGIN: response should include the username being searched', () => {
        Users.findBy('coffe').first()
            .then((user) => {
                expect(user).toContain('autoTest')
                Users.remove(52)
            })
    })
})