const db = require('../data/dbConfig.js')
const Users = require('../auth/authModel.js')
const Posts = require('./postsModel.js')

describe('Posts Model', function() {

    it('Should add a post', () => {      
        Posts.addPost({post_title:'tester', post_text:'tester test'})
            .then((response) => {
                expect(db('posts').toHaveLength(1))
            })
    })
    it('Should remove the post', () => {
        Posts.deletePost(1, 1)
            .then((response) => {
                expect(db('posts').toHaveLength(0))
            })
    })
})