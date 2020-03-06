const server = require('../api/server.js')
const request = require('supertest')
const db = require('../data/dbConfig.js')
const Users = require('../auth/authModel.js')  
const Posts = require('./postsModel.js')

describe('Post Router', function() {

    it('Should add a post and return status 201', () => {  
        return request(server).post('/api/auth/register')
            .send({username:'Nick1234567891011', password:'password'})  
            .then((response) => {
                return request(server).post('/api/auth/login')
                .send({username:'Nick1234567891011', password:'password'})
                    .then((response) => {
                        id = response.body.id
                        token = response.body.token
                        return request(server).post(`/api/user/${id}`)
                        .set('Authorization', token)
                        .send({post_title: new Date().toTimeString(), post_text:"my post"})
                        .then((response) => {
                            expect(response.body.message).toContain('Successfully')
                            expect(response.body.prediction).toBeTruthy()
                            // Posts.deletePost(1,1)
                            Users.remove({username:'Nick1234567891011'})
                        })
                    })
            })  
    })
})

