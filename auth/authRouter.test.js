const server = require('../api/server.js')
const request = require('supertest')
const db = require('../data/dbConfig.js')

describe('auth router', function() {



    it('POST A NEW USER: should return status 201', () => {

        //     beforeEach(async () => {
        // await db('users').delete()
        // })

        return request(server).post('/api/auth/register')
            .send({username:'ohmygod-new-new', password:'pass'})
                .then((response) => {  
                    expect(response.status).toBe(201)
                    expect(response.body.newId.length).toEqual(1)
                    expect(response.body.message).toContain("Registered!")
                })
    })
    it('LOGIN: should return a json web token', () => {

        return request(server).post('/api/auth/login')
            .send({username:'ohmygod', password:'pass'})
                .then((response) => {
                    expect(response.body.token.length).toBeGreaterThan(25)
                })
    })
})