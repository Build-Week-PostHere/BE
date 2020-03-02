const db = require('../data/dbConfig.js')

module.exports = {
    // helpers go in this object
    addPost,
    getPosts,
    getAPost,
    deletePost,
    editPost
}

// Adding a post
function addPost(post) {
    return db('posts').insert(post, 'user_id')
}

function getPosts(user_id) {
    return db('posts').where({user_id})
}

function getAPost(post_id) {
    return db('posts').where({
        id: post_id
        })
}

function deletePost(post_id) {
    return db('posts').where({
        id: post_id
    })
    .delete()
}

function editPost(post_id, newPost) {
    return db('posts').where({
        id: post_id
    }).update(newPost)

}