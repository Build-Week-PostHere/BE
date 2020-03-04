const Posts = require('./postsModel.js')

const express = require('express')

const router = express.Router()

// endpoints
router.get('/:id', (req, res) => {
    const { id } = req.params
    const subject = req.decodedToken.subject

    if (subject.toString() === id) {
        Posts.getPosts(id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed."})
        }) 
    } else {
        res.status(400).json({message:"You are not authorized to access these posts."})
    }

})

router.post('/:id', (req, res) => {
    const { id } = req.params
    const post = req.body
    const subject = req.decodedToken.subject

    if (post && post.post_title && post.post_text && subject.toString() === id) {

        Posts.addPost({...post, user_id: id})
            .then((id) => {
                res.status(201).json({id:id, message:"Successfully added post."})
            })
            .catch((error) => {
                res.status(500).json({message:"Server failed."})
            })
    } else {
        res.status(400).json({message:"Please provide a title and text. If you have a title or text, then you are not authorized to post here."})
    }
})

router.get('/:id/post/:post_id', (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id
    const subject = req.decodedToken.subject

    if (subject.toString() === id) {
        Posts.getAPost(id, post_id)
        .then((post) => {
            res.status(200).json(post)
        })
        .catch((error) => {
            res.status(500).json({message:"Server failed."})
        })
    } else {
        res.status(400).json({message:"You are not authorized to access this post."})
    }
})

router.delete('/:id/post/:post_id', (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id
    const subject = req.decodedToken.subject

    if (subject.toString() === id) {
        Posts.deletePost(id, post_id)
        .then((deleted) => {
            res.status(200).json({ message:"The post has been deleted." })
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed." })
        })
    } else {
        res.status(400).json({message:"You can only delete posts you have created."})
    }

})

router.put('/:id/post/:post_id', (req, res) => {
    const id = req.params.id
    const post_id = req.params.post_id
    const newPost = req.body
    const subject = req.decodedToken.subject

    if (subject.toString() === id) {
        Posts.editPost(id, post_id, newPost)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch((error) => {
            res.status(500).json({ message:"Server failed" })
        })
    } else {
        res.status(400).json({message:"You can only edit posts that you have created."})
    }
})



// export 
module.exports = router