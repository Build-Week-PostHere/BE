const server = require('../api/server.js')
const request = require('supertest')
const db = require('../data/dbConfig.js')
const Users = require('../auth/authModel.js')

describe('Post Router', function() {

    it('Should add a post and return status 201', () => {
        return request(server).post('/api/auth/register')
            .send({username:'Nick123456', password:'password'})
            .then((response) => {
                return request(server).post('/api/auth/login')
                .send({username:'Nick123456', password:'password'})
                    .then((response) => {
                        id = response.body.id
                        return request(server).post(`/api/user/${id}`)
                        .send({post_title:"test post", post_text:"my post"})
                        .then((response) => {
                            expect(response.body.message).toContain('Successfully')
                            expect(response.body.prediction).toBeTruthy()
                        })
                    })
            })  
    })
})

