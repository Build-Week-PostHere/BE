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
    return db('posts').insert(post, 'id')
}

function getPosts(user_id) {
    return db('posts').where({user_id})
}

function getAPost(id, post_id) {
    return db('posts').where({
        id: post_id,
        user_id: id
        })
}

function deletePost(id, post_id) {
    return db('posts').where({
        id: post_id,
        user_id: id
    })
    .delete()
}

function editPost(id, post_id, newPost) {
    return db('posts').where({
        id: post_id
    }).update(newPost)

}