const Posts = require('./postsModel.js')

const express = require('express')

const router = express.Router()

// endpoints
router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.getPosts(id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed."})
        }) 
})

router.post('/:id', (req, res) => {
    const { id } = req.params
    const post = req.body
    
    console.log("This is the post:", post)
    if (post && post.post_title && post.post_text) {

        Posts.addPost({...post, user_id: id})
            .then((id) => {
                res.status(201).json({id:id, message:"Successfully added post."})
            })
            .catch((error) => {
                res.status(500).json({message:"Server failed."})
            })
    } else {
        res.status(400).json({message:"Please provide a title and text."})
    }
})

router.get('/:id/post/:post_id', (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id
    console.log("id and post_id:", id, post_id)

    Posts.getAPost(id, post_id)
        .then((post) => {
            res.status(200).json(post)
        })
        .catch((error) => {
            res.status(500).json({message:"Server failed."})
        })
})

router.delete('/:id/post/:post_id', (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id

    Posts.deletePost(id, post_id)
        .then((deleted) => {
            res.status(200).json({ message:"The post has been deleted." })
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed." })
        })
})

router.put('/:id/post/:post_id', (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id
    const newPost = req.body

    Posts.editPost(id, post_id, newPost)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed" })
        })
})



// export 
module.exports = router